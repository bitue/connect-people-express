const { message } = require('../libs/message');
const { userModel } = require('../models/userSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// get all user : GET
const getUser = async (req, res) => {
    try {
        const allData = await userModel.find({});
        res.json(allData);
    } catch (error) {
        res.send({ error: error.message }).status(500);
    }
};

// register user : POST
const registerUser = async (req, res, next) => {
    const { email, password, name } = req.body;

    try {
        const user = await userModel.findOne({ email }); // need to async func
        if (user) {
            res.send({ message: 'user already exist ' }).status(200);
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    res.send({ message: err.message }).status(500);
                }
                const saveUser = new userModel({ name, email, password: hash });
                await saveUser.save(); // async func
            });
            const msg = message(201, 'user created success');

            res.send(msg.message).status(msg.status);
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getUser,
    registerUser
};
