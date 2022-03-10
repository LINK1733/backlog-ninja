import React from 'react';
import { Button } from 'react-bootstrap';

export default function GameToDoItem({ parentGame, toDoItem, deleteToDoItem }) {
	const deleteToDo = (e) => {
		const toDoItemToDelete = {
			toDoItemId: e.currentTarget.id,
			parentGameId: parentGame,
		};
		deleteToDoItem(toDoItemToDelete);
	};

	return (
		<div className="form-check border-bottom border-secondary pb-1 d-flex justify-content-between">
			<span
				id="toDoText"
				className={`form-check-label px-2 flex-grow-1 my-auto`}
			>
				{toDoItem.taskText}
			</span>

			<Button
				variant="secondary"
				size="sm"
				id={toDoItem.id}
				onClick={deleteToDo}
			>
				<span className="visually-hidden">Delete To Do</span>
				&times;
			</Button>
		</div>
	);
}
