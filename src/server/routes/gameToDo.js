const express = require('express'),
	router = express.Router(),
	game = require('../controllers/game'),
	gameToDo = require('../controllers/gameToDo');

router
	.route('/')
	.get(game.getToDoList)
	.put(gameToDo.newToDoList)
	.delete(gameToDo.deleteToDoList);

router
	.route('/toDoItem')
	.put(gameToDo.newToDoItem)
	.delete(gameToDo.deleteToDoItem);

router.route('/updatePlayStatus').put(game.updatePlayStatus);

module.exports = router;
