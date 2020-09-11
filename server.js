const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectStore = require('connect-mongo');
const mongoose = require('mongoose');

const sessionRoute = require('./routes/session');
const register = require('./routes/register');
const index = require('./routes/index');
const profile = require('./routes/profile');
const connectDB = require('./config/db.js');

connectDB();
const app = express();
const MongoStore = connectStore(session);

app.use( express.static( "public" ) );
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    name: 'sid',
    secret: 'testing',
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: parseInt(60 * 60 * 2 * 1000)       // in seconds
    }),
    cookie: {
        sameSite: false,
        secure: false,
        maxAge: parseInt(60 * 60 * 2 * 1000)
    }
}));


// Initial checking of old cookies
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

app.use('/session', sessionRoute);
app.use('/profile', profile);
app.use('/register', register);
app.use('/', index);

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running at post ${PORT}`) });