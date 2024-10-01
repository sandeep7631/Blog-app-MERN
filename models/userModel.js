const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide your username!']
    },
    email:{
        type: String, 
        unique: true,  
        required: [true,"Please provide your email address!"]
    },
    password:{
        type: String,
        required: [true,"Please provide a password!"]
    },
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Blog',
        }
    ]
},{timestamps:true})

const userModel = mongoose.model( 'User', userSchema );
module.exports = userModel;