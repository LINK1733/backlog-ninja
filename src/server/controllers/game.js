const catchAsync = require('../utils/catchAsync'),
	{ getGameList } = require('./gameList'),
	prisma = require('../db/prisma');

module.exports.getToDoList = catchAsync(async (req, res, next) => {
	try {
		const toDoLists = await prisma.toDoList.findMany({
			where: {
				authorId: req.user.id,
				parentGameId: req.query.parentGameId
					? req.query.parentGameId
					: req.body.parentGameId,
			},
			include: {
				toDoItems: true,
			},
		});
		res.json(toDoLists);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to fetch to do lists' });
	}
});

module.exports.deleteGame = catchAsync(async (req, res, next) => {
	try {
		const { gameId } = req.body;

		await prisma.game.delete({
			where: { id: gameId },
		});

		getGameList(req, res);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to delete game' });
	}
});

module.exports.showGame = catchAsync(async (req, res, next) => {
	try {
		const game = await prisma.game.findUnique({
			where: { id: req.params.id },
			include: { igdbGame: true },
		});
		res.json(game);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to retrieve game' });
	}
});

module.exports.updatePlayStatus = catchAsync(async (req, res, next) => {
	try {
		const game = await prisma.game.update({
			where: { id: req.body.game },
			data: {
				playStatus: req.body.newPlayStatus,
			},
			include: {
				igdbGame: true,
			},
		});

		res.json(game);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to update game status' });
	}
});
