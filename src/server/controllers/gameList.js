if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const { ModuleFilenameHelpers } = require('webpack'),
	catchAsync = require('../utils/catchAsync'),
	getManifest = require('../utils/getManifest'),
	prisma = require('../db/prisma');

module.exports.getGameList = catchAsync(async (req, res) => {
	const gameLists = await prisma.gameList.findMany({
		where: {
			authorId: req.user.id,
		},
		include: {
			games: true,
		},
	});
	res.json(gameLists);
});

module.exports.searchGame = catchAsync(async (req, res) => {
	const searchResult = await prisma.igdbGame.findMany({
		take: 10,
		where: {
			name: {
				contains: `${req.body.searchInput}`,
				mode: 'insensitive',
			},
			AND: [{ versionParent: null }, { parentGame: null }],
		},
		select: { name: true, cover: true, id: true },
	});

	res.json(searchResult);
});

module.exports.addGameItem = catchAsync(async (req, res, next) => {
	try {
		const cover = await prisma.igdbGame.findUnique({
			where: {
				id: req.body.gameId,
			},
			select: { cover: true },
		});

		const coverPhoto = cover.cover;

		await prisma.game.create({
			data: {
				gameName: req.body.gameName,
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
				cover: coverPhoto,
				complete: false,
			},
		});

		module.exports.getGameList(req, res);
	} catch (e) {
		console.log(e);
		next({ status: 400, message: 'failed to create game' });
	}
});

module.exports.deleteGameList = catchAsync(async (req, res, next) => {
	try {
		const listDelete = prisma.gameList.delete({
			where: { id: req.body.gameListId },
			include: {
				games: true,
			},
		});

		const gameDelete = prisma.game.deleteMany({
			where: { parentListId: req.body.gameListId },
		});

		await prisma.$transaction([gameDelete, listDelete]);

		module.exports.getGameList(req, res);
	} catch (e) {
		console.log(e);
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
		console.log(e);
		next({ status: 400, message: 'failed to create game list' });
	}
});
