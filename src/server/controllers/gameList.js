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
				include: {
					igdbGame: true,
				},
			},
		},
	});
	res.json(gameLists);
});

module.exports.searchGame = catchAsync(async (req, res) => {
	let searchResult = await prisma.igdbGameName.findMany({
		take: 10,
		where: {
			name: {
				search: req.body.searchInput.split(' ').join(' & '),
			},
			igdbGame: { versionParent: null },
		},

		select: { igdbGame: { select: { name: true, cover: true, id: true } } },
		distinct: ['igdbGameId'],
	});

	res.json(searchResult.map((result) => result.igdbGame));
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
			},
		});

		module.exports.getGameList(req, res);
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

		module.exports.getGameList(req, res);
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

		module.exports.getGameList(req, res);
	} catch (e) {
		console.error(e);
		next({ status: 400, message: 'failed to create game list' });
	}
});
