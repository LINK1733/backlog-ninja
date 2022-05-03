const catchAsync = require('../utils/catchAsync'),
	{ getGameList } = require('./gameList'),
	hltb = require('howlongtobeat'),
	prisma = require('../db/prisma');

let hltbService = new hltb.HowLongToBeatService();

module.exports.getToDoList = catchAsync(async (req, res, next) => {
	try {
		let userId = req.session.user.sub;
		userId = userId.slice(userId.indexOf('|') + 1);
		const toDoLists = await prisma.toDoList.findMany({
			where: {
				authorId: userId,
				parentGameId: req.query.parentGameId
					? req.query.parentGameId
					: req.body.parentGameId,
			},
			include: {
				toDoItems: {
					orderBy: {
						listPosition: 'asc',
					},
				},
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
		let userId = req.session.user.sub;
		userId = userId.slice(userId.indexOf('|') + 1);
		const { gameId, parentListId } = req.body;

		const gameList = await prisma.gameList.findUnique({
			where: { id: parentListId },
			include: {
				games: {
					orderBy: {
						listPosition: 'asc',
					},
				},
			},
		});

		const gameIndex = gameList.games.findIndex((x) => x.id === gameId);

		await prisma.game.delete({
			where: { id: gameId },
		});

		for (let i = gameIndex + 1; i < gameList.games.length; i++) {
			await prisma.game.updateMany({
				where: {
					id: gameList.games[i].id,
					authorId: userId,
				},
				data: { listPosition: gameList.games[i].listPosition - 1 },
			});
		}

		getGameList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to delete game' });
	}
});

module.exports.showGame = catchAsync(async (req, res, next) => {
	try {
		const game = await prisma.game.findUnique({
			where: { id: req.params.id },
			include: {
				igdbGame: {
					include: {
						gameMode: { select: { gameMode: true } },
						genre: { select: { genre: true } },
						playerPerspective: {
							select: { playerPerspective: true },
						},
						theme: { select: { theme: true } },
					},
				},
			},
		});

		const hltbTime = await hltbService.search(game.igdbGame.name);

		game.hltbTime = hltbTime.filter((results) => results.similarity > 0.85);
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
				igdbGame: {
					include: {
						gameMode: { select: { gameMode: true } },
						genre: { select: { genre: true } },
						playerPerspective: {
							select: { playerPerspective: true },
						},
						theme: { select: { theme: true } },
					},
				},
			},
		});

		const hltbTime = await hltbService.search(game.igdbGame.name);

		game.hltbTime = hltbTime.filter((results) => results.similarity > 0.85);

		res.json(game);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to update game status' });
	}
});

module.exports.reorderGames = catchAsync(async (req, res, next) => {
	try {
		let userId = req.session.user.sub;
		userId = userId.slice(userId.indexOf('|') + 1);
		const { games } = req.body.reorderedList;
		for (let i = 0; i < games.length; i++) {
			await prisma.game.updateMany({
				where: { id: games[i].id, authorId: userId },
				data: { listPosition: i },
			});
		}
		getGameList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to update list positions' });
	}
});
