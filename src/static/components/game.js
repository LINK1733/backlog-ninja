import React from 'react';
import '../styles/game.scss';
import { Button } from 'react-bootstrap';

export default function Game({ game, deleteGame }) {
	const deleteItem = (e) => {
		e.preventDefault();
		const gameToDelete = {
			game: e.currentTarget.id,
		};
		deleteGame(gameToDelete);
	};
	let thumbnail = '';
	if (game.igdbGame.cover) {
		thumbnail = game.igdbGame.cover.replace('thumb', 'micro');
	}

	return (
		<div className="border-bottom border-secondary my-2 pb-2 d-flex align-items-center">
			<Button variant="link" className="gameButton flex-grow-1 my-auto">
				<img
					className="float-start rounded"
					src={thumbnail}
					id={game.id}
				/>
				<span id="gameName" className="flex-grow-1 my-auto ps-1">
					{game.igdbGame.name}
				</span>
			</Button>

			<Button
				variant="secondary"
				size="sm"
				id={game.id}
				onClick={deleteItem}
			>
				<span className="visually-hidden">Delete Game</span>
				&times;
			</Button>
		</div>
	);
}
