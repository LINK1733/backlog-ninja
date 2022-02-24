import React from 'react';
import '../styles/game.scss';
import { Button } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

export default function Game({ game, deleteGame }) {
	const deleteItem = (e) => {
		e.preventDefault();
		const gameToDelete = {
			game: e.currentTarget.id,
			parentListId: game.parentListId,
		};
		deleteGame(gameToDelete);
	};
	let thumbnail = '';
	if (game.igdbGame.cover) {
		thumbnail = game.igdbGame.cover.replace('thumb', 'micro');
	}

	return (
		<Draggable
			draggableId={game.id}
			key={`draggable-${game.id}`}
			index={game.listPosition}
			disableInteractiveElementBlocking={true}
		>
			{(provided) => (
				<div
					className="border-bottom border-secondary my-2 pb-2 d-flex align-items-center"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					id="gameDiv"
				>
					<i className="fa-solid fa-grip-vertical verticalMoveDots" />

					<Button
						variant="link"
						className="gameButton flex-grow-1 my-auto"
					>
						<img
							className="float-start rounded"
							src={thumbnail}
							id={game.id}
						/>
						<span
							id="gameName"
							className="flex-grow-1 my-auto ps-1"
						>
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
			)}
		</Draggable>
	);
}
