if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const { default: igdb } = require('igdb-api-node'),
	catchAsync = require('../utils/catchAsync'),
	prisma = require('../db/prisma');

module.exports.getGames = catchAsync(async (req, res) => {
	let totalGames = await igdb(
		`${process.env.TWITCH_CLIENT_ID}`,
		`${process.env.TWITCH_APP_ACCESS_TOKEN}`
	).request('/games/count');

	let totalAltNames = await igdb(
		`${process.env.TWITCH_CLIENT_ID}`,
		`${process.env.TWITCH_APP_ACCESS_TOKEN}`
	).request('/alternative_names/count');

	let totalPlayerPerspectives = await igdb(
		`${process.env.TWITCH_CLIENT_ID}`,
		`${process.env.TWITCH_APP_ACCESS_TOKEN}`
	).request('/player_perspectives/count');

	let totalGameModes = await igdb(
		`${process.env.TWITCH_CLIENT_ID}`,
		`${process.env.TWITCH_APP_ACCESS_TOKEN}`
	).request('/game_modes/count');

	let totalThemes = await igdb(
		`${process.env.TWITCH_CLIENT_ID}`,
		`${process.env.TWITCH_APP_ACCESS_TOKEN}`
	).request('/themes/count');

	let totalGenres = await igdb(
		`${process.env.TWITCH_CLIENT_ID}`,
		`${process.env.TWITCH_APP_ACCESS_TOKEN}`
	).request('/genres/count');

	totalAltNames = totalAltNames.data.count;
	totalPlayerPerspectives = totalPlayerPerspectives.data.count;
	totalGameModes = totalGameModes.data.count;
	totalThemes = totalThemes.data.count;
	totalGenres = totalGenres.data.count;
	totalGames = totalGames.data.count;

	let playerPerspective = [],
		gameMode = [],
		theme = [],
		genre = [],
		games = [],
		data = [];

	try {
		// For fetching Player Perspectives
		for (i = 0; i < totalPlayerPerspectives; i += 500) {
			const playerPerspectives = await igdb(
				process.env.TWITCH_CLIENT_ID,
				process.env.TWITCH_APP_ACCESS_TOKEN
			)
				.fields('name')

				.limit(500)
				.offset(i)

				.request('/player_perspectives');

			playerPerspective = playerPerspective.concat(
				playerPerspectives.data
			);
			data.push(playerPerspective);
		}

		// For creating Player Perspectives
		for (i = 0; i < totalPlayerPerspectives; i += 1) {
			await prisma.igdbGamePlayerPerspective.upsert({
				where: {
					id: playerPerspective[i].id,
				},
				update: {
					id: playerPerspective[i].id,
					name: playerPerspective[i].name,
				},
				create: {
					id: playerPerspective[i].id,
					name: playerPerspective[i].name,
				},
			});
		}
		data = [];
		console.log('Player Perspectives complete');

		// For fetching Game Modes
		for (i = 0; i < totalGameModes; i += 500) {
			const gameModes = await igdb(
				process.env.TWITCH_CLIENT_ID,
				process.env.TWITCH_APP_ACCESS_TOKEN
			)
				.fields('name')

				.limit(500)
				.offset(i)

				.request('/game_modes');

			gameMode = gameMode.concat(gameModes.data);
			data.push(gameMode);
		}

		// For creating Game Modes
		for (i = 0; i < totalGameModes; i += 1) {
			await prisma.igdbGameGameMode.upsert({
				where: {
					id: gameMode[i].id,
				},
				update: {
					id: gameMode[i].id,
					name: gameMode[i].name,
				},
				create: {
					id: gameMode[i].id,
					name: gameMode[i].name,
				},
			});
		}
		data = [];
		console.log('Game modes complete');

		// For fetching Themes
		for (i = 0; i < totalThemes; i += 500) {
			const themes = await igdb(
				process.env.TWITCH_CLIENT_ID,
				process.env.TWITCH_APP_ACCESS_TOKEN
			)
				.fields('name')

				.limit(500)
				.offset(i)

				.request('/themes');

			theme = theme.concat(themes.data);
			data.push(theme);
		}

		// For creating Themes
		for (i = 0; i < totalThemes; i += 1) {
			await prisma.igdbGameTheme.upsert({
				where: {
					id: theme[i].id,
				},
				update: {
					id: theme[i].id,
					name: theme[i].name,
				},
				create: {
					id: theme[i].id,
					name: theme[i].name,
				},
			});
		}
		data = [];
		console.log('Theme complete');

		// For fetching Genres
		for (i = 0; i < totalGenres; i += 500) {
			const genres = await igdb(
				process.env.TWITCH_CLIENT_ID,
				process.env.TWITCH_APP_ACCESS_TOKEN
			)
				.fields('name')

				.limit(500)
				.offset(i)

				.request('/genres');

			genre = genre.concat(genres.data);
			data.push(genre);
		}

		// For creating Genres
		for (i = 0; i < totalGenres; i += 1) {
			await prisma.igdbGameGenre.upsert({
				where: {
					id: genre[i].id,
				},
				update: {
					id: genre[i].id,
					name: genre[i].name,
				},
				create: {
					id: genre[i].id,
					name: genre[i].name,
				},
			});
		}
		data = [];
		console.log('Genre complete');

		// For fetching the IGDB Games
		for (i = 0; i < totalGames; i += 500) {
			const newGames = await igdb(
				process.env.TWITCH_CLIENT_ID,
				process.env.TWITCH_APP_ACCESS_TOKEN
			)
				.fields(
					'name,cover.url,version_parent.name,parent_game.name,genres,game_modes,player_perspectives,themes,alternative_names.name,summary'
				)

				.limit(500)
				.offset(i)

				.request('/games');
			games = games.concat(newGames.data);

			console.log(`igdbGame Fetch Progress: ${i}/${total}`);
		}

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
								playerPerspectiveId: playerPerspectiveId,
							};
						}
					),
				};
			}

			if (games[i].themes) {
				data.theme = {
					create: games[i].themes.map((themeId) => {
						return {
							themeId: themeId,
						};
					}),
				};
			}

			if (games[i].genres) {
				data.genre = {
					create: games[i].genres.map((genreId) => {
						return {
							genreId: genreId,
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
