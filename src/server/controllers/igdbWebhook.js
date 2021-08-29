if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const { default: igdb } = require('igdb-api-node'),
	catchAsync = require('../utils/catchAsync'),
	prisma = require('../db/prisma');

module.exports.getGames = catchAsync(async (req, res) => {
	const totalGames = await igdb(
		`${process.env.TWITCH_CLIENT_ID}`,
		`${process.env.TWITCH_APP_ACCESS_TOKEN}`
	).request('/games/count');

	async function getGameDB() {}

	const total = totalGames.data.count;
	let data = [];
	let games = [];
	try {
		for (i = 0; i < total; i += 500) {
			await new Promise((resolve) => setTimeout(resolve, 250));
			const newGames = await igdb(
				process.env.TWITCH_CLIENT_ID,
				process.env.TWITCH_APP_ACCESS_TOKEN
			)
				.fields('name,cover.url,version_parent.name,parent_game.name')

				.limit(500)
				.offset(i)

				.request('/games');
			console.log(`Progress: ${i}/${total}`);

			games = games.concat(newGames.data);
		}
		for (i = 0; i < total; i += 1) {
			data.push({
				id: games[i].id,
				name: games[i].name,
				cover: games[i].cover?.url || null,
				versionParent: games[i].version_parent?.name || null,
				parentGame: games[i].parent_game?.name || null,
			});
			console.log(`Progress: ${i}/${total}`);
		}
		await prisma.igdbGame.createMany({
			data,
		});
		console.log('Database complete.');
	} catch (e) {
		console.log(e);
		throw e;
	}
});
