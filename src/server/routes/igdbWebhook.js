const igdbWebhook = require('../controllers/igdbWebhook');

const express = require('express'),
	router = express.Router();

router.route('/getGames').get(igdbWebhook.getGames);

module.exports = router;
