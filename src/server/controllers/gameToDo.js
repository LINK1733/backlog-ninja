const catchAsync = require('../utils/catchAsync'),
	prisma = require('../db/prisma'),
	{ getToDoList } = require('./game');

module.exports.newToDoList = catchAsync(async (req, res, next) => {
	try {
		let userId = req.session.user.sub;
		userId = userId.slice(userId.indexOf('|') + 1);
		await prisma.toDoList.create({
			data: {
				toDoListName: req.body.toDoListName,
				author: {
					connect: {
						id: userId,
					},
				},
				parentGame: {
					connect: {
						id: req.body.parentGameId,
					},
				},
			},
		});
		getToDoList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to create to do list' });
	}
});

module.exports.deleteToDoList = catchAsync(async (req, res, next) => {
	try {
		await prisma.toDoList.delete({
			where: { id: req.body.toDoListId },
		});

		getToDoList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to delete to do list' });
	}
});

module.exports.newToDoItem = catchAsync(async (req, res, next) => {
	try {
		let userId = req.session.user.sub;
		userId = userId.slice(userId.indexOf('|') + 1);
		await prisma.toDoItem.create({
			data: {
				taskText: req.body.toDoItemText,
				author: {
					connect: {
						id: userId,
					},
				},
				parentToDoList: {
					connect: {
						id: req.body.parentToDoList,
					},
				},
				listPosition: req.body.listLength,
			},
		});
		getToDoList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to create to do item' });
	}
});

module.exports.deleteToDoItem = catchAsync(async (req, res, next) => {
	try {
		let userId = req.session.user.sub;
		userId = userId.slice(userId.indexOf('|') + 1);
		const { toDoItemId, parentListId } = req.body;

		const toDoList = await prisma.toDoList.findUnique({
			where: { id: parentListId },
			include: {
				toDoItems: {
					orderBy: {
						listPosition: 'asc',
					},
				},
			},
		});

		const toDoIndex = toDoList.toDoItems.findIndex(
			(x) => x.id === toDoItemId
		);

		await prisma.toDoItem.delete({
			where: { id: toDoItemId },
		});

		for (let i = toDoIndex + 1; i < toDoList.toDoItems.length; i++) {
			await prisma.toDoItem.updateMany({
				where: { id: toDoList.toDoItems[i].id, authorId: userId },
				data: { listPosition: toDoList.toDoItems[i].listPosition - 1 },
			});
		}

		getToDoList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to delete game' });
	}
});

module.exports.updateToDoItem = catchAsync(async (req, res, next) => {
	try {
		const { editedToDo, toDoItemId } = req.body;

		await prisma.toDoItem.update({
			where: { id: toDoItemId },
			data: { taskText: editedToDo },
		});

		getToDoList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to update toDoText' });
	}
});

module.exports.reorderToDoItems = catchAsync(async (req, res, next) => {
	try {
		let userId = req.session.user.sub;
		userId = userId.slice(userId.indexOf('|') + 1);
		const { toDoItems } = req.body.reorderedList;
		for (let i = 0; i < toDoItems.length; i++) {
			await prisma.toDoItem.updateMany({
				where: { id: toDoItems[i].id, authorId: userId },
				data: { listPosition: i },
			});
		}
		getToDoList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to update list positions' });
	}
});
