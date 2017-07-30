const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');


require('./models/User');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

mongoose.connect(keys.mongoURI);

const port = process.env.PORT || 5000;
const app = express();


app.use(bodyParser.json());
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
billingRoutes(app);

if (process.env.NODE_ENV === 'production') {
    //Express will serve up production assests like main.js or main.css files
    //below code says that,if some get request comes for any resource(files)
    //that we do not understand then look into client/build 
    //to see for that file and load that file
    //Eg: client/build/static/css/main.css
    app.use(express.static('client/build'));

    //Express will serve up index.html file if it doesnt  recognize a route
    const path = require('path');
    app.get('*', (req, res) => {       
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});