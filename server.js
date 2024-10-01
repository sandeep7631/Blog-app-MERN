const express= require('express');
const cors = require('cors');
const morgan = require( 'morgan' );  // used to log requests to the console
const colors = require('colors');
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const connectDB = require('./config/db');


//env config
dotenv.config();

//router import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

//mongodb connection
connectDB();

//rest object
const app= express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/blogs', blogRoutes);


//port
const port= process.env.PORT || 8080;

//listen
app.listen(8080, ()=>{
    console.log(`Server is running on ${process.env.DEV_MODE} mode port ${8080}`.bgGreen);
});