import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'
import { Typography } from '@mui/material';
const UserBlogs = () => {
    const [blogs, setBlogs] = useState([])

    //get user blogs
    const getUserBlogs = async () =>{
        try {
            const id = localStorage.getItem('userId');
            const {data} = await axios.get(`/api/v1/blogs/user-blog/${id}`);
            if(data?.success){
                setBlogs(data?.userBlog.blogs)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserBlogs();
    }, []);
    console.log(blogs);
  return (
    <div>
        {blogs && blogs.length>0 ? (        blogs.map(blog =>(
        <BlogCard 
        id={blog._id}
        isUser={true}
        title={blog.title}
        description = {blog.description}
        image = {blog.image}
        username = {blog.user.username}
        time = {blog.createdAt} />))) : (
          <div style={{ paddingTop: '50px', textAlign: 'center' }}>
          <Typography variant="h3" style={{ color: '#666', fontSize: '24px', marginBottom: '20px' }}>
            You haven't created any blog!
          </Typography>
        </div>
        )}
    </div>
  );
};

export default UserBlogs;
