if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const catchAsync = require('../utils/catchAsync'),
	prisma = require('../db/prisma');

module.exports.getGameList = catchAsync(async (req, res) => {
	const gameLists = await prisma.gameList.findMany({
		where: {
			authorId: req.user.id,
		},
		include: {
			games: {
				orderBy: {
					listPosition: 'asc',
				},
				include: {
					igdbGame: true,
				},
			},
		},
	});
	res.json(gameLists);
});

module.exports.searchGame = catchAsync(async (req, res) => {
	const gameListGames = req.body.gameListGames;

	let searchInput = req.body.searchInput.replace(/[^0-9a-zA-Z]+/g, '_');

	searchInput = searchInput.replace(/^_|_$/g, '');

	let searchResults = await prisma.igdbGameName.findMany({
		take: 30,
		where: {
			name: {
				search: searchInput,
			},
			igdbGame: { versionParent: null },
		},
		orderBy: {
			_relevance: {
				fields: ['name'],
				search: searchInput,
				sort: 'asc',
			},
		},

		select: { igdbGame: { select: { name: true, cover: true, id: true } } },
		distinct: ['igdbGameId'],
	});

	const gamesToRemove = [];

	for (let i = 0; i < gameListGames.length; i++) {
		const gameIndex = searchResults.findIndex(
			(x) => x.igdbGame.id === gameListGames[i].igdbGame.id
		);

		if (gameIndex !== -1) {
			gamesToRemove.push(gameIndex);
		}
	}

	gamesToRemove.sort();

	const newSearchResults = Array.from(searchResults);

	for (let i = gamesToRemove.length - 1; i >= 0; i--) {
		newSearchResults.splice(gamesToRemove[i], 1);
	}

	newSearchResults.splice(10, newSearchResults.length);

	searchResults = newSearchResults;

	res.json(searchResults.map((result) => result.igdbGame));
});

module.exports.addGameItem = catchAsync(async (req, res, next) => {
	try {
		await prisma.game.create({
			data: {
				author: {
					connect: {
						id: req.user.id,
					},
				},
				parentList: {
					connect: {
						id: req.body.parentList,
					},
				},
				igdbGame: {
					connect: {
						id: req.body.gameId,
					},
				},
				complete: false,
				listPosition: req.body.listLength,
			},
		});

		module.exports.getGameList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to create game' });
	}
});

module.exports.deleteGameList = catchAsync(async (req, res, next) => {
	try {
		await prisma.gameList.delete({
			where: { id: req.body.gameListId },
		});

		module.exports.getGameList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to delete game list' });
	}
});

module.exports.newGameList = catchAsync(async (req, res, next) => {
	try {
		await prisma.user.update({
			data: {
				lists: {
					create: [{ listName: req.body.listName }],
				},
			},
			where: {
				id: req.user.id,
			},
		});

		module.exports.getGameList(req, res, next);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to create game list' });
	}
});
