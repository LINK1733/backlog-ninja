const catchAsync = require('../utils/catchAsync'),
	prisma = require('../db/prisma'),
	{ getToDoList } = require('./game');

module.exports.newToDoList = catchAsync(async (req, res, next) => {
	try {
		await prisma.toDoList.create({
			data: {
				toDoListName: req.body.toDoListName,
				author: {
					connect: {
						id: req.user.id,
					},
				},
				parentGame: {
					connect: {
						id: req.body.parentGame,
					},
				},
			},
		});

		getToDoList(req, res);
	} catch (e) {
		console.log(e);
		next({ status: 400, message: 'failed to create to do list' });
	}
});

module.exports.deleteToDoList = catchAsync(async (req, res, next) => {
	try {
		const toDoListDelete = prisma.toDoList.delete({
			where: { id: req.body.toDoListId },
			include: {
				toDoItems: true,
			},
		});

		const toDoItemDelete = prisma.toDoItem.deleteMany({
			where: { parentToDoListId: req.body.toDoListId },
		});

		await prisma.$transaction([toDoItemDelete, toDoListDelete]);

		getToDoList(req, res);
	} catch (e) {
		console.log(e);
		next({ status: 400, message: 'failed to delete to do list' });
	}
});

module.exports.newToDoItem = catchAsync(async (req, res, next) => {
	try {
		await prisma.toDoItem.create({
			data: {
				taskText: req.body.toDoItemText,
				author: {
					connect: {
						id: req.user.id,
					},
				},
				parentToDoList: {
					connect: {
						id: req.body.parentToDoList,
					},
				},
			},
		});
		getToDoList(req, res);
	} catch (e) {
		console.log(e);
		next({ status: 400, message: 'failed to create to do item' });
	}
});

module.exports.deleteToDoItem = catchAsync(async (req, res, next) => {
	try {
		const { toDoItemId } = req.body;

		await prisma.toDoItem.delete({
			where: { id: toDoItemId },
		});

		getToDoList(req, res);
	} catch (e) {
		console.log(e);
		next({ status: 400, message: 'failed to delete game' });
	}
});
