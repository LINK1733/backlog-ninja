import React from 'react';
import GameListKeeper from './gameListKeeper';

export default function Home({
	gameList,
	setGameList,
	deleteGame,
	deleteGameList,
	reorderGameList,
}) {
	return (
		<div className="pt-5">
			<GameListKeeper
				allGameLists={gameList}
				setGameList={setGameList}
				deleteGame={deleteGame}
				deleteGameList={deleteGameList}
				reorderGameList={reorderGameList}
			/>
		</div>
	);
}
