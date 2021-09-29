if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const { default: igdb } = require('igdb-api-node'),
	catchAsync = require('../utils/catchAsync'),
	prisma = require('../db/prisma');

const fetchItems = async (fields, requestLocation, data) => {
	let continueFetch = true;
	let offset = 0;

	while (continueFetch == true) {
		const fetchedData = await igdb(
			process.env.TWITCH_CLIENT_ID,
			process.env.TWITCH_APP_ACCESS_TOKEN
		)
			.fields(fields)

			.limit(500)
			.offset(offset)

			.request(requestLocation);
		if (fetchedData.data.length != 0) {
			data = data.concat(fetchedData.data);
		}
		offset += 500;
		if (fetchedData.data.length == 0) {
			return data;
		}
	}
};

const createItems = async (data, table) => {
	for (i = 0; i < data.length; i += 1) {
		await prisma[table].upsert({
			where: {
				id: data[i].id,
			},
			update: {},
			create: {
				id: data[i].id,
				name: data[i].name,
			},
		});
	}
};

module.exports.getGames = catchAsync(async (req, res) => {
	let games = [],
		data = [];

	try {
		// For fetching Player Perspectives
		data = await fetchItems('name', '/player_perspectives', data);

		// For creating Player Perspectives
		await createItems(data, 'igdbGamePlayerPerspective');
		data = [];
		console.log('Player Perspectives complete');

		// For fetching Game Modes
		data = await fetchItems('name', '/game_modes', data);

		// For creating Game Modes
		await createItems(data, 'igdbGameGameMode');
		data = [];
		console.log('Game modes complete');

		// For fetching Themes
		data = await fetchItems('name', '/themes', data);

		// For creating Themes
		await createItems(data, 'igdbGameTheme');
		data = [];
		console.log('Theme complete');

		// For fetching Genres
		data = await fetchItems('name', '/genres', data);

		// For creating Genres
		await createItems(data, 'igdbGameGenre');
		data = [];
		console.log('Genre complete');

		// For fetching the IGDB Games
		games = await fetchItems(
			'name,cover.url,version_parent.name,parent_game.name,genres,game_modes,player_perspectives,themes,alternative_names.name,summary',
			'/games',
			games
		);
		console.log('Fetched games. Moving onto creating games.');

		// For creating the IGDB Games
		for (i = 0; i < totalGames; i += 1) {
			data = {
				id: games[i].id,
				name: games[i].name,
				summary: games[i].summary,
				cover: games[i].cover?.url || null,
				versionParent: games[i].version_parent?.name || null,
				parentGame: games[i].parent_game?.name || null,
			};

			if (games[i].player_perspectives) {
				data.playerPerspective = {
					create: games[i].player_perspectives.map(
						(playerPerspectiveId) => {
							return {
								playerPerspectiveId,
							};
						}
					),
				};
			}

			if (games[i].themes) {
				data.theme = {
					create: games[i].themes.map((themeId) => {
						return {
							themeId,
						};
					}),
				};
			}

			if (games[i].genres) {
				data.genre = {
					create: games[i].genres.map((genreId) => {
						return {
							genreId,
						};
					}),
				};
			}
			if (games[i].alternative_names) {
				const gameNameArray = games[i].alternative_names.map(
					(altNameId) => {
						return {
							altNameId: altNameId.id,
							name: altNameId.name,
						};
					}
				);
				gameNameArray.push({ name: games[i].name });
				data.gameName = {
					create: gameNameArray,
				};
			}

			if (games[i].alternative_names == undefined) {
				data.gameName = { create: { name: games[i].name } };
			}

			if (games[i].game_modes) {
				data.gameMode = {
					create: games[i].game_modes.map((gameModeId) => {
						return {
							gameModeId: gameModeId,
						};
					}),
				};
			}

			await prisma.igdbGame.create({
				data,
			});
			data = [];
			if (i % 1000 == 0) {
				console.log(`Game Progress: ${i}/${total}`);
			}
		}

		console.log('igdbGame complete.');
		console.log('Database complete.');
	} catch (e) {
		console.error(e);
		throw e;
	}
});
