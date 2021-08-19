const catchAsync = require('../utils/catchAsync'),
	getManifest = require('../utils/getManifest'),
	bcrypt = require('bcrypt'),
	prisma = require('../db/prisma');

module.exports.renderRegister = catchAsync(async (req, res) => {
	const manifest = await getManifest();
	res.render('users/register', { manifest });
});

module.exports.register = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		async function hashPassword(password) {
			return await bcrypt.hash(password, 12);
		}
		const hashedPass = await hashPassword(password);

		const registeredUser = await prisma.user.create({
			data: {
				email: email,
				username: username,
				hash: hashedPass,
			},
		});

		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', 'Account registered successfully!');
			res.redirect('/');
		});
	} catch (e) {
		req.flash(
			'error',
			'Something went wrong, check your inputs and try again.'
		);
		console.log(e);
		res.redirect('register');
	}
};

module.exports.renderLogin = catchAsync(async (req, res) => {
	const manifest = await getManifest();
	res.render('users/login', { manifest });
});

module.exports.login = (req, res) => {
	req.flash('success', 'Logged in successfully');
	const redirectUrl = req.session.returnTo || '/';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'You have been successfully logged out.');
	res.redirect('/');
};
