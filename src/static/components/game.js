import React from 'react';

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
		<div className="form-check border-bottom my-2 pb-2 d-flex gap-2">
			<button className={'btn form-check-label px-2 flex-grow-1 my-auto'}>
				<img className={'float-start'} src={thumbnail} id={game.id} />
				<span className={'form-check-label px-2 flex-grow-1 my-auto '}>
					{game.igdbGame.name}
				</span>
			</button>

			<button
				type="button"
				className="btn btn-secondary btn-sm"
				id={game.id}
				onClick={deleteItem}
			>
				<span className="visually-hidden">Delete Game</span>
				&times;
			</button>
		</div>
	);
}
