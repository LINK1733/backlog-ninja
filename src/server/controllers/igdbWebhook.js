const { default: axios } = require('axios');
const { default: igdb } = require('igdb-api-node'),
	catchAsync = require('../utils/catchAsync'),
	prisma = require('../db/prisma'),
	fs = require('fs'),
	os = require('os');

const fetchItems = async (fields, requestLocation) => {
	let continueFetch = true;
	let offset = 0;
	let itemsToCreate = [];

	while (continueFetch === true) {
		const fetchedData = await igdb(
			process.env.TWITCH_CLIENT_ID,
			process.env.TWITCH_APP_ACCESS_TOKEN
		)
			.fields(fields)

			.limit(500)
			.offset(offset)

			.request(requestLocation);
		if (fetchedData.data.length !== 0) {
			itemsToCreate = itemsToCreate.concat(fetchedData.data);
		}
		offset += 500;
		if (fetchedData.data.length === 0) {
			return itemsToCreate;
		}
	}
};

const createItems = async (itemsToCreate, table) => {
	for (let i = 0; i < itemsToCreate.length; i += 1) {
		await prisma[table].upsert({
			where: {
				id: itemsToCreate[i].id,
			},
			update: {},
			create: {
				id: itemsToCreate[i].id,
				name: itemsToCreate[i].name,
			},
		});
	}
};

module.exports.getGames = catchAsync(async () => {
	let games = [],
		data = [];

	try {
		// For fetching & creating Player Perspectives
		await createItems(
			await fetchItems('name', '/player_perspectives'),
			'igdbGamePlayerPerspective'
		);
		console.log('Player Perspectives complete');

		// For fetching & creating Game Modes
		await createItems(
			await fetchItems('name', '/game_modes'),
			'igdbGameGameMode'
		);
		console.log('Game modes complete');

		// For fetching & creating Themes
		await createItems(await fetchItems('name', '/themes'), 'igdbGameTheme');
		console.log('Theme complete');

		// For fetching & creating Genres
		await createItems(await fetchItems('name', '/genres'), 'igdbGameGenre');
		console.log('Genre complete');

		// For fetching the IGDB Games
		games = await fetchItems(
			'name,cover.url,version_parent.name,parent_game.name,genres,game_modes,player_perspectives,themes,alternative_names.name,summary',
			'/games'
		);
		console.log('Fetched games. Moving onto creating games.');

		// For creating the IGDB Games
		for (let i = 0; i < games.length; i += 1) {
			let findGame = await prisma.igdbGame.findUnique({
				where: { id: games[i].id },
			});
			if (findGame == null) {
				data = {
					id: games[i].id,
					name: games[i].name,
					summary: games[i].summary,
					cover:
						games[i].cover?.url ||
						'//images.igdb.com/igdb/image/upload/t_thumb/nocover.png',
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

				if (games[i].alternative_names === undefined) {
					data.gameName = { create: { name: games[i].name } };
				}

				if (games[i].game_modes) {
					data.gameMode = {
						create: games[i].game_modes.map((gameModeId) => {
							return {
								gameModeId,
							};
						}),
					};
				}

				await prisma.igdbGame.create({
					data,
				});
			}
			data = [];

			if (i % 1000 === 0) {
				console.log(`Game Progress: ${i}/${games.length}`);
			}
		}

		console.log('igdbGame complete.');
		console.log('Database complete.');
	} catch (e) {
		console.error(e);
		throw e;
	}
});

module.exports.createRequest = catchAsync(async (req, res) => {
	const games = req.body;
	let data = {
		id: games.id,
		name: games.name,
		summary: games.summary,
		cover: '//images.igdb.com/igdb/image/upload/t_thumb/nocover.png',
		versionParent: games.version_parent?.name || null,
		parentGame: games.parent_game?.name || null,
	};
	if (games.cover) {
		const coverUrl = await igdb(
			process.env.TWITCH_CLIENT_ID,
			process.env.TWITCH_APP_ACCESS_TOKEN
		)
			.fields('url')
			.where(`id = ${games.cover}`)

			.request('/covers');
		data.cover = coverUrl.data[0].url;
	}
	if (games.player_perspectives) {
		data.playerPerspective = {
			create: games.player_perspectives.map((playerPerspectiveId) => {
				return {
					playerPerspectiveId,
				};
			}),
		};
	}

	if (games.themes) {
		data.theme = {
			create: games.themes.map((themeId) => {
				return {
					themeId,
				};
			}),
		};
	}

	if (games.genres) {
		data.genre = {
			create: games.genres.map((genreId) => {
				return {
					genreId,
				};
			}),
		};
	}
	if (games.alternative_names) {
		const gameNameArray = await Promise.all(
			games.alternative_names.map(async (altNameId) => {
				const altName = await igdb(
					process.env.TWITCH_CLIENT_ID,
					process.env.TWITCH_APP_ACCESS_TOKEN
				)
					.fields('name')
					.where(`id = ${altNameId}`)

					.request('/alternative_names');

				const name = altName.data;
				return {
					altNameId,
					name: name[0].name,
				};
			})
		);

		gameNameArray.push({ name: games.name });
		data.gameName = {
			create: gameNameArray,
		};
	}

	if (games.alternative_names === undefined) {
		data.gameName = { create: { name: games.name } };
	}

	if (games.game_modes) {
		data.gameMode = {
			create: games.game_modes.map((gameModeId) => {
				return {
					gameModeId,
				};
			}),
		};
	}
	await prisma.igdbGame.create({
		data,
	});

	res.send(console.log('game create complete'));
});

module.exports.deleteRequest = catchAsync(async (req, res) => {
	const deleteData = req.body;

	await prisma.igdbGame.delete({
		where: { id: deleteData.id },
	});

	res.send(console.log('deletion complete'));
});

module.exports.updateRequest = catchAsync(async (req, res) => {
	const updateData = req.body;

	if (updateData.cover) {
		const coverUrl = await igdb(
			process.env.TWITCH_CLIENT_ID,
			process.env.TWITCH_APP_ACCESS_TOKEN
		)
			.fields('url')
			.where(`id = ${updateData.cover}`)

			.request('/covers');
		updateData.cover = coverUrl.data[0];
	}

	await prisma.igdbGame.update({
		where: {
			id: updateData.id,
		},
		data: {
			id: updateData.id,
			name: updateData.name,
			summary: updateData.summary,
			cover:
				updateData.cover?.url ||
				'//images.igdb.com/igdb/image/upload/t_thumb/nocover.png',
			versionParent: updateData.version_parent?.name || null,
			parentGame: updateData.parent_game?.name || null,
		},
	});
	res.send(console.log('game update complete'));
});

module.exports.getNewToken = catchAsync(async (req, res) => {
	const setEnvValue = (key, value) => {
		const ENV_VARS = fs.readFileSync('./.env', 'utf8').split(os.EOL);
		const target = ENV_VARS.indexOf(
			ENV_VARS.find((line) => line.split('=')[0] === key)
		);

		ENV_VARS.splice(target, 1, `${key}=${value}`);

		fs.writeFileSync('./.env', ENV_VARS.join(os.EOL));
	};
	try {
		await axios
			.post(
				`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`
			)
			.then((res) =>
				setEnvValue('TWITCH_APP_ACCESS_TOKEN', res.data.access_token)
			)
			.then(res.send(console.log('update complete')));
	} catch (e) {
		console.error(e);
	}
});
