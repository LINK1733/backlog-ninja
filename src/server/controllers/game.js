const catchAsync = require('../utils/catchAsync'),
	{ getGameList } = require('./gameList'),
	prisma = require('../db/prisma');

module.exports.deleteGame = catchAsync(async (req, res, next) => {
	try {
		const { gameId } = req.body;

		await prisma.game.delete({
			where: { id: gameId },
		});

		getGameList(req, res);
	} catch (e) {
		console.log(e);
		next({ status: 400, message: 'failed to delete game' });
	}
});
