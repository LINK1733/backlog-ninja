import React from 'react';

export default function GameToDoItem({ toDoItem, deleteToDoItem }) {
	const deleteToDo = (e) => {
		deleteToDoItem(e.currentTarget.id);
	};

	return (
		<div className="form-check border-bottom my-2 pb-2 d-flex gap-2">
			<label
				className={`form-check-label px-2 flex-grow-1 my-auto`}
				htmlFor={toDoItem.id}
			>
				{toDoItem.taskText}
			</label>

			<button
				type="button"
				className="btn btn-secondary btn-sm"
				id={toDoItem.id}
				onClick={deleteToDo}
			>
				<span className="visually-hidden">Delete To Do</span>
				&times;
			</button>
		</div>
	);
}
