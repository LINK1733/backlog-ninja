import React from 'react';
import { Link } from 'react-router-dom';
import Game from './game';
import GameSearch from './gameSearch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

	const getRandomGame = () => {
		if (games.length > 1) {
			const randomNum = Math.floor(Math.random() * games.length);
			toast(`Play ${games[randomNum].igdbGame.name}`);
		} else if (games.length == 1) {
			toast.warn('You need to add at least one more game to this list!');
		} else {
			toast.warn('Add a couple games to your list first!');
		}
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
					<span className="visually-hidden">Delete List</span>
					&times;
				</button>
				<button
					type="button"
					className="btn btn-secondary btn-sm"
					onClick={getRandomGame}
				>
					Don't know what to play?
				</button>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
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
