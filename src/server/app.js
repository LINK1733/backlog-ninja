if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    ejsMate = require('ejs-mate'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user'),
    MongoStore = require('connect-mongo'),
    userRoutes = require('./routes/users'),
    todoRoutes = require('./routes/todos'),
    flash = require('connect-flash'),
    catchAsync = require('./utils/catchAsync'),
    getManifest = require('./utils/getManifest'),
    serialize = require('serialize-javascript');


const dbUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/game-tracker`

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
app.use('/todos', todoRoutes);

app.get('/', catchAsync(async (req, res) => {
    const manifest = await getManifest();
    if(req.user){
        res.render('home', {
            user: serialize(req.user),
            manifest
        });
    } else {
        res.render('splash', {manifest})
    }
}))

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})