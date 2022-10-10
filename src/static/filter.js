export const filterList = (gameList, playStatusFilter) => {
	let gamesWithFilter = [];
	let gamesWithoutFilter = [];

	for (let i = 0; i < gameList.games.length; i++) {
		if (gameList.games[i].playStatus === `${playStatusFilter}`) {
			gamesWithFilter.push(gameList.games[i]);
		} else {
			gamesWithoutFilter.push(gameList.games[i]);
		}
	}

	const data = {
		gamesWithFilter: gamesWithFilter,
		gamesWithoutFilter: gamesWithoutFilter,
	};

	return data;
};
