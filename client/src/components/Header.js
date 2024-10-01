import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Header = () => {
  //global state
  let isLogin = useSelector(state => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const[value,setValue]= useState();

  //log out
  const handleLogOut = () => {
    try {
      dispatch(authActions.logout);
      toast.success('Signed out Successfully!');
      navigate('/Login');
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <AppBar position='sticky' style={{ backgroundColor: 'rgb(21, 18, 78)' }}>

        <Toolbar>
        <Typography variant='h4'>
  <span style={{ color: 'red' }}>My</span>
  <span style={{ color: 'white' }}>Blog</span>
</Typography>
{isLogin && (
  <Box display={'flex'} marginLeft="auto" marginRight={'auto'}>
  <Tabs textColor='inherit' value={value} onChange={(e, val)=>setValue(val)}>
    <Tab label="Blogs" LinkComponent={Link} to="/blogs"/>
    <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs"/>
    <Tab label="Create Blog" LinkComponent={Link} to="/create-blog"/>
  </Tabs>
</Box>
)}
          <Box display={'flex'} marginLeft="auto">
            {!isLogin && (<>
              <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login">Sign in</Button>
            <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/Register">Register</Button></>
            )}
            {isLogin && (<Button onClick={handleLogOut} sx={{ margin: 1, color: 'white' }}>Sign Out</Button>)}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

