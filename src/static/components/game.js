import React, { useState } from 'react';
import '../styles/game.scss';
import { Button } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

export default function Game({ game, deleteGame }) {
	const [dotStyle, setDotStyle] = useState();

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

	const showDots = () => {
		setDotStyle({ visibility: 'visible' });
		document.body.addEventListener(
			'mouseup',
			() => {
				setDotStyle({});
			},
			{ once: true }
		);
	};

	return (
		<Draggable
			draggableId={game.id}
			key={`draggable-${game.id}`}
			index={game.listPosition}
			disableInteractiveElementBlocking={true}
		>
			{(provided) => (
				<div
					className="border-bottom border-secondary my-1 pb-1 d-flex align-items-center justify-content-between"
					{...provided.draggableProps}
					ref={provided.innerRef}
					id="gameDiv"
					onMouseDown={showDots}
				>
					<i
						className="fa-solid fa-grip-vertical verticalMoveDots"
						{...provided.dragHandleProps}
						style={dotStyle}
					/>

					<Button
						variant="link"
						className="gameButton flex-grow-1 my-auto"
					>
						<img
							className="float-start rounded"
							src={thumbnail}
							id={game.id}
							alt={
								'https://images.igdb.com/igdb/image/upload/t_micro/nocover.png'
							}
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
