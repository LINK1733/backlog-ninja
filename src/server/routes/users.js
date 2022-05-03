const express = require('express'),
	router = express.Router(),
	users = require('../controllers/users');

router.route('/login').post(users.login);

router.get('/logout', users.logout);

module.exports = router;
