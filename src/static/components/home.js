import React from 'react';
import GameListKeeper from './gameListKeeper';

export default function Home({
	gameList,
	setGameList,
	deleteGame,
	deleteGameList,
}) {
	return (
		<div className="mt-5">
			<GameListKeeper
				allGameLists={gameList}
				setGameList={setGameList}
				deleteGame={deleteGame}
				deleteGameList={deleteGameList}
			/>
		</div>
	);
}
