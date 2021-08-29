const express = require('express'),
	router = express.Router(),
	gameList = require('../controllers/gameList'),
	game = require('../controllers/game');

router.route('/').get(gameList.getGameList).put(gameList.newGameList);

router.route('/search').put(gameList.searchGame);

router.route('/addGame').put(gameList.addGameItem);

router.route('/deleteGame').delete(game.deleteGame);

router.route('/deleteGameList').delete(gameList.deleteGameList);

router.route('/:id/getGamePage').get(game.showGame);

module.exports = router;
