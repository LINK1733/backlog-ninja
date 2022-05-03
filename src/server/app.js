const dotenvExpand = require('dotenv-expand'),
	dotenv = require('dotenv');
dotenvExpand.expand(dotenv.config());

const express = require('express'),
	path = require('path'),
	ejsMate = require('ejs-mate'),
	expressSession = require('express-session'),
	flash = require('connect-flash'),
	catchAsync = require('./utils/catchAsync'),
	getManifest = require('./utils/getManifest'),
	serialize = require('serialize-javascript'),
	redis = require('redis'),
	connectRedis = require('connect-redis');

const gameRoutes = require('./routes/gameList'),
	userRoutes = require('./routes/users'),
	igdbWebhookRoutes = require('./routes/igdbWebhook'),
	gameToDoRoutes = require('./routes/gameToDo');

const app = express(),
	port = 3000;

const redisClient = redis.createClient({ host: process.env.REDIS_HOST });

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(express.json());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const secret = process.env.SESSION_SECRET;

const RedisStore = connectRedis(expressSession),
	sessionStore = new RedisStore({ client: redisClient });

app.use(
	expressSession({
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000,
		},
		secret: secret,
		resave: true,
		saveUninitialized: true,
		store: sessionStore,
	})
);

app.use(flash());

app.use((req, res, next) => {
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

app.use('/', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/igdbWebhook', igdbWebhookRoutes);
app.use('/api/gameToDoLists', gameToDoRoutes);

app.get(
	'/',
	catchAsync(async (req, res) => {
		const manifest = await getManifest();
		if (req.session.user) {
			res.render('home', {
				user: serialize(req.session.user),
				manifest,
			});
		} else {
			res.render('splash', { manifest });
		}
	})
);

app.get(
	'/games/*',
	catchAsync(async (req, res) => {
		const manifest = await getManifest();

		if (req.session.user) {
			res.render('home', {
				user: serialize(req.session.user),
				manifest,
			});
		} else {
			res.redirect('/');
		}
	})
);

app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
