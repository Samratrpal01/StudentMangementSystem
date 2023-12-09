const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const User = require('../Models/UserModel');

const authRouter = express.Router();

passport.use('local', new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                console.log("username not found");
                return done(null, false, { message: 'Invalid Username.' });
            }
            
            if (!user.isValid(password)) {
                console.log("Wrong Password");
                return done(null, false, { message: 'Incorrect Password.' });
            }

            // Generate and sign a JWT token
            const secretKey = 'ResultManagement';
            const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
           
            console.log("Login Successful");
            return done(null, user, { token });
        })
        .catch(err => {
            console.error("Error during authentication:", err);
            return done(err, false, { message: 'Unknown Error' });
        });
}));


authRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        req.session.token=info.token;
        console.log(req.session);
        res.status(200).send({ token: info.token }); 
    })(req, res, next);
});

module.exports = authRouter;
