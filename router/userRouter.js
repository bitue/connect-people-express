const { getUser, registerUser } = require('../controllers/userController');
const userRouter = require('express').Router();
const passport = require('passport');
const { checkUser } = require('../authentication/userAuth');

// get all user : GET
userRouter.get('/user', getUser);
// register user : POST
userRouter.post('/register', registerUser);
// userRouter.post('/login', (req, res) => {
//     res.send(req.body);
// });
userRouter.get('/login', (req, res) => {
    res.render('login.ejs');
});
userRouter.get('/profile', checkUser, (req, res) => {
    res.render('profile.ejs');
});
userRouter.get('/payment', checkUser, (req, res) => {
    res.render('payment.ejs');
});

userRouter.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/profile' }),
    function (req, res) {
        res.redirect('/');
    }
);

// log out route : get
userRouter.get('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            res.send({
                message: err.message
            });
        } else {
            res.render('login.ejs');
        }
    });
});

userRouter.get('/dashboard', (req, res) => {
    res.send('user');
});

module.exports = userRouter;
