const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	catchAsync = require('../utils/catchAsync'),
	users = require('../controllers/users'),
	LocalStrategy = require('passport-local').Strategy,
	prisma = require('../db/prisma'),
	bcrypt = require('bcrypt');

passport.use(
	new LocalStrategy(async function (username, password, done) {
		try {
			const user = await prisma.user.findUnique({ where: { username } }),
				passwordCorrect =
					user && (await bcrypt.compare(password, user.hash));

			if (passwordCorrect) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		} catch (e) {
			done(e, false);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

router
	.route('/change-password')
	.get(users.renderChange)
	.post(catchAsync(users.updatePassword));

passport.deserializeUser(async (userId, done) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		user ? done(null, user) : done(new Error('No User Found'), false);
	} catch (e) {
		done(e, false);
	}
});

router
	.route('/register')
	.get(users.renderRegister)
	.post(catchAsync(users.register));

router
	.route('/login')
	.get(users.renderLogin)
	.post(
		passport.authenticate('local', {
			failureFlash: true,
			failureRedirect: '/login',
		}),
		function (req, res) {
			res.redirect('/');
		}
	);

router.get('/logout', users.logout);

module.exports = router;
