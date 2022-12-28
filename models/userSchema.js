const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

const userModel = new mongoose.model('user', userSchema);

module.exports = {
    userModel
};
