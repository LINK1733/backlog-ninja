if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express'),
	path = require('path'),
	ejsMate = require('ejs-mate'),
	expressSession = require('express-session'),
	passport = require('passport'),
	flash = require('connect-flash'),
	catchAsync = require('./utils/catchAsync'),
	getManifest = require('./utils/getManifest'),
	{ PrismaSessionStore } = require('@quixo3/prisma-session-store'),
	prisma = require('./db/prisma');

const gameRoutes = require('./routes/gameList'),
	userRoutes = require('./routes/users'),
	igdbWebhookRoutes = require('./routes/igdbWebhook'),
	gameToDoRoutes = require('./routes/gameToDo');

const app = express(),
	port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(express.json());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const secret = process.env.SESSION_SECRET;

app.use(
	expressSession({
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000,
		},
		secret: secret,
		resave: true,
		saveUninitialized: true,
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000,
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	})
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

app.use('/', userRoutes);
app.use('/games', gameRoutes);
app.use('/igdbWebhook', igdbWebhookRoutes);
app.use('/gameToDoLists', gameToDoRoutes);

app.get(
	'/',
	catchAsync(async (req, res) => {
		const manifest = await getManifest();
		if (req.user) {
			res.render('home', {
				user: serialize(req.user),
				manifest
			});
		} else {
			res.render('splash', { manifest });
		}
	})
);

app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
