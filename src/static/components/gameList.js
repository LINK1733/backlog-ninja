import React from 'react';
import { Link } from 'react-router-dom';
import Game from './game';
import GameSearch from './gameSearch';

export default function GameList({
	gameList,
	setGameList,
	deleteGame,
	deleteGameList,
}) {
	const listName = gameList.listName;

	const games = gameList.games;

	const deleteList = (e) => {
		const gameListToDelete = {
			gameListId: e.currentTarget.id,
		};
		deleteGameList(gameListToDelete);
	};

	return (
		<div className="col-xs-12 col-sm-6 col-md-4">
			<div className="p-3 border bg-light">
				<h2 className="text-center">{listName}</h2>
				<button
					type="button"
					className="btn btn-secondary btn-sm"
					id={gameList.id}
					onClick={deleteList}
				>
					<span className="sr-only">Delete List</span>
				</button>
				<GameSearch gameList={gameList} setGameList={setGameList} />

				{games.map((game) => {
					return (
						<Link
							to={`/games/${game.id}`}
							key={game.id}
							className="flex-grow-1 gameLink"
						>
							<Game
								game={game}
								key={game.id}
								deleteGame={deleteGame}
							/>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
