const passport = require('passport');
const LocalStrategy = require('passport-local');
const { userModel } = require('../models/userSchema');
const bcrypt = require('bcrypt');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await userModel.findOne({ name: username });
            console.log(user);
            if (!user) {
                return done(null, false, { message: 'incorrect user' });
            }
            if (!bcrypt.compare(password, user.password)) {
                return done(null, false, { message: 'incorrect password' });
            }
            return done(null, user);
        } catch (error) {
            console.log(error);
            return done(error);
        }
    })
);

// serialize here
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// find session info using session id
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});
