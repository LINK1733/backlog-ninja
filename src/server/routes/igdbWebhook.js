const igdbWebhook = require('../controllers/igdbWebhook');

const express = require('express'),
	router = express.Router();

router.route('/getGames').get(igdbWebhook.getGames);
router.route('/createRequest').post(igdbWebhook.createRequest);
router.route('/updateRequest').post(igdbWebhook.updateRequest);
router.route('/deleteRequest').post(igdbWebhook.deleteRequest);

module.exports = router;
