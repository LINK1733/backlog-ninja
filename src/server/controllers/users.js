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
		console.error(e);
		res.redirect('register');
	}
};

module.exports.renderLogin = catchAsync(async (req, res) => {
	const manifest = await getManifest();
	res.render('splash', { manifest });
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

module.exports.renderChange = catchAsync(async (req, res) => {
	const manifest = await getManifest();
	res.render('users/changePassword', { user: req.user, manifest });
});

module.exports.updatePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		async function hashPassword(password) {
			return await bcrypt.hash(password, 12);
		}
		const currentUser = await prisma.user.findUnique({
				where: { id: req.user.id },
			}),
			passwordCorrect =
				currentUser &&
				(await bcrypt.compare(oldPassword, currentUser.hash));

		if (passwordCorrect) {
			let newHash = await hashPassword(newPassword);
			await prisma.user.update({
				where: {
					id: req.user.id,
				},
				data: {
					hash: newHash,
				},
			});
		} else {
			throw new Error('403 Current Password Incorrect');
		}
		req.flash('success', 'Password changed successfully!');
		res.redirect('/');
	} catch (e) {
		req.flash(
			'error',
			'Something went wrong, check your inputs and try again.'
		);
		console.error(e);
		res.redirect('change-password');
	}
};
