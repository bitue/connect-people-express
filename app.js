const express = require('express');
const app = express();
const session = require('express-session');
require('dotenv').config();
const cors = require('cors');
const { urlencoded } = require('express');
const userRouter = require('./router/userRouter');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./config/passport.config');

// cors middleware
app.use(cors());
// express json() to get json data
app.use(express.json());
// from data get
app.use(urlencoded({ extended: true }));
// middleware for session manage by express-session package
app.set('trust proxy', 1); // trust first proxy
app.use(
    session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.DB_STRING,
            collectionName: 'users-sessions'
            // mongoOptions: advancedOptions // See below for details
        })
    })
);
// passport init
app.use(passport.initialize());
//make sure use session$ npm install passport-local
app.use(passport.session());
// home '/' : get
app.get('/', (req, res) => {
    res.send('welcome to server');
});
// all userRouter
app.use('/', userRouter);
// final error  middleware
app.use((err, req, res, next) => {
    if (err) {
        res.send({
            message: err.message
        });
    }
});

module.exports = app;
