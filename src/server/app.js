if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('../server/models/user')
const MongoStore = require('connect-mongo')
const userRoutes = require('../server/routes/users')
const flash = require('connect-flash');

const dbUrl = 'mongodb://localhost:27017/game-tracker'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const secret = process.env.SESSION_SECRET;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on("error", function (e) {
    console.log("Session Store Error", e)
})

const sessionConfig = {
    store,
    name: 'GameTrackerSession',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);

app.get('/', (req, res) => {
    if(req.user){
        res.render('home')
    } else {
        res.render('splash')
    }
})

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})