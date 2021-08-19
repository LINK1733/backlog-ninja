const { ModuleFilenameHelpers } = require('webpack');
const Todo = require('../models/todo'),
    catchAsync = require('../utils/catchAsync'),
    getManifest = require('../utils/getManifest');

module.exports.getTodo = catchAsync(async (req, res, next) => {
    try {
      const todos = await Todo.find({})
      return success(res, todos)
    } catch (err) {
      next({ status: 400, message: "failed to get todos" })
    }
  })


  module.exports.todo = catchAsync( async ( req, res, next) => {
    try {
          const todo = new Todo(req.body);
          await todo.save();
          return success(res, todo)      
    } catch(e) {
        next({status: 400, message: "failed to create todos"})
    }
  })
