const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//saves the user id into a cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//retrieves user id from the cookie 
//and then retrieve user from db using that id
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id });
    if (user) {
        return done(null, existingUser);
    }
    const user = await new User({ googleID: profile.id }).save();
    done(null, user);
}));

