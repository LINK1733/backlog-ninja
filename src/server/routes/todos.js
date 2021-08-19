const express = require('express'),
    router = express.Router(),
    todos = require('../controllers/todos'),
    catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(catchAsync(todos.renderTodos))
    .post(catchAsync(todos.todo))

// router.route('/:id')
    // .put()
    // .delete()

module.exports = router;