const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

//GET all Blogs
exports.getAllBlogsController = async(req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:'No Blogs found!'
            });
        }
        return res.status(200).send({
            success:true,
            BlogCount: blogs.length,
            message:"All blogs list:",
            blogs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error while getting Blogs',
            error
        });
    }
};

//Create Blog
exports.createBlogController = async(req,res) => {
    try {
        const {title,description,image, user} = req.body
        //validation
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:'Please provide all fields!'
            });
        }
        const existingUser = await userModel.findById(user)
        //validation
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:'Unable to find user'
            });
        }

        const newBlog = new blogModel ({title,description,image, user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session})
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success:true,
            message:'Blog created successfully :)',
            newBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error while creating blog',
            error
        })
    }
};

//Update blog
exports.updateBlogController = async(req,res) => {
    try {
        const {id} = req.params
        const {title,description,image} = req.body
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message:'Blog updated successfully',
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error while pdating blog',
            error
        });
    }
};

//Single Blog
exports.getBlogByIdcontroller = async(req,res) => {
    try {
        const {id} = req.params
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success:false,
                message:"Blog not found"
            });
        }
        return res.status(200).send({
            success:true,
            message:'Blog found',
            blog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error while getting blog',
            error
        });
    }
};

//Delete Blog
exports.deleteBlogController = async(req,res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:'Blog deleted sucessfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error while deleting blog',
            error
        });
    }
};

//GET USER BLOG
exports.userBlogController = async(req, res) =>{
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message: 'Blogs not found with this id',
            });
        }
        return res.status(200).send({
            success:true,
            message:'User blog',
            userBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error in user blog',
            error
        });
    }
};