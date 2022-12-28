const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            unique: true
        },
        comments: [String],
        like: {
            type: Number
        },
        unLike: {
            type: Number
        },
        userLink: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user'
        }
    },
    { timestamps: true }
);

const postModel = new mongoose.model('post', postSchema);

module.exports = {
    postModel
};
