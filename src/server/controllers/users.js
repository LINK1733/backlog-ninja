const AuthenticationClient = require('auth0').AuthenticationClient;

var auth0 = new AuthenticationClient({
	domain: process.env.AUTH0DOMAIN,
	clientId: process.env.AUTH0CLIENTID,
});

module.exports.login = (req, res) => {
	auth0.getProfile(req.body.accessToken, function (err, userInfo) {
		if (err) {
			console.error(err);
		}
		req.session.user = userInfo;
		res.send();
	});
};

module.exports.logout = (req, res) => {
	req.session.user = '';
	res.redirect('/');
};
