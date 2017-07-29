const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const port = process.env.PORT || 3000;
const app = express();

//tell express to use cookieSession module
//create a cookie that exists for 30 days
//and then encrypt the cookie using 'keys' property
//keys.cookieKey is a salt we use to encrypt
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

//tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});