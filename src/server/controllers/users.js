const AuthenticationClient = require('auth0').AuthenticationClient,
	prisma = require('../db/prisma');

var auth0 = new AuthenticationClient({
	domain: process.env.AUTH0DOMAIN,
	clientId: process.env.AUTH0CLIENTID,
});

module.exports.login = (req, res) => {
	auth0.getProfile(req.body.accessToken, async function (err, userInfo) {
		if (err) {
			console.error(err);
		}
		if (userInfo) {
			let userId = userInfo.sub;
			userId = userId.slice(userId.indexOf('|') + 1);
			console.log(userInfo);
			await prisma.user.upsert({
				where: { id: userId },
				update: { id: userId },
				create: { id: userId, email: userInfo.email },
			});

			req.session.user = userInfo;
			res.send();
		}
	});
};

module.exports.logout = (req, res) => {
	req.session.user = '';
	res.redirect('/');
};
