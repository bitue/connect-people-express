const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING, () => {
            console.log('Connect DB ');
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;
