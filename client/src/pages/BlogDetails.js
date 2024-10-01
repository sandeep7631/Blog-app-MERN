import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate , useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';

const BlogDetails = () => {
    const [blog,setBlog]= useState({})
    const id= useParams().id; 
    const navigate =  useNavigate();

    const [inputs, setInputs] = useState({
    });

    //get blog details
    const getBlogDetails = async()=>{
        try {
            const {data}= await axios.get(`/api/v1/blogs/get-blog/${id}`)
            if(data?.success){
                setBlog(data?.blog)
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getBlogDetails()
    },[id]);

    
    //input change
    const handleChange = (e) =>{
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    
        //form
        const handleSubmit = async(e) =>{
            e.preventDefault();
            try {
                const {data}= await axios.put(`/api/v1/blogs/update-blog/${id}`,{
                    title : inputs.title, 
                    description : inputs.description,
                    image : inputs.image,
                    user:id,
                });
                if(data?.success){
                    toast.success('Blog updated successfully!')
                    navigate("/my-blogs");
                }
            } catch (error) {
                console.log(error);
            }
        };

    console.log(blog);

  return (
    <>
     <form onSubmit={handleSubmit}>
<Box width={'40%'} border={3} borderRadius={10} padding={3} margin="auto" marginTop="20px" marginBottom="20px" boxShadow={'10px 10px 20px #ccc'} display='flex' flexDirection={'column'} bgcolor="#f9f9f9" height="40%">

    <Typography variant='h2' textAlign={'center'} fontWeight="bold" padding={3} color={"#333"} borderBottom={1} borderColor={"#ccc"} marginBottom={3} fontSize="40px">Update post</Typography>

    <InputLabel sx={{mb:1,mt:2, fontSize:'20px', fontWeight:"bold", color: '#333'}}>Title</InputLabel>
    <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined" fullWidth sx={{mb:2}} required></TextField>

    <InputLabel sx={{mb:1,mt:2, fontSize:'20px', fontWeight:"bold", color: '#333'}}>Description</InputLabel>
    <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant="outlined" fullWidth sx={{mb:2}} required></TextField>

    <InputLabel sx={{mb:1,mt:2, fontSize:'20px', fontWeight:"bold", color: '#333'}}>Image Url</InputLabel>
    <TextField name="image" value={inputs.image} onChange={handleChange} margin="normal" variant="outlined" fullWidth sx={{mb:3}} required></TextField>

    <Button type='submit' color='warning' variant='contained' sx={{width: '200px', margin: 'auto'}}>Update</Button>
</Box>
      </form>
    </>
  )
}

export default BlogDetails;
