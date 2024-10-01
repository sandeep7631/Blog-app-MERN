const express = require ('express');
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdcontroller, deleteBlogController, userBlogController } = require('../controller/blogController');

//router object
const router = express.Router();

//routes
//GET || all blogs
router.get('/all-blog',getAllBlogsController);

//POST || create blogs
router.post('/create-blog',createBlogController);

//PUT || update blog
router.put('/update-blog/:id',updateBlogController);

//GET ||Single blog details
router.get('/get-blog/:id', getBlogByIdcontroller);

//DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController);

//GET || user blog
router.get('/user-blog/:id',userBlogController)

module.exports = router;