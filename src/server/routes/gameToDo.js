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
	.delete(gameToDo.deleteToDoItem)
	.patch(gameToDo.updateToDoItem);

router.route('/updatePlayStatus').put(game.updatePlayStatus);

router.route('/reorderToDoItems').put(gameToDo.reorderToDoItems);

module.exports = router;
