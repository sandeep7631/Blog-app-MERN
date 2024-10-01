const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB database ${mongoose.connection.host}`.bgMagenta.bold);
    } catch (error) {
        console.log(`Error connecting to database: ${error.message}`.bgRed.white);
    }
};

module.exports = connectDB;