import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameToDoItem from './gameToDoItem';

export default function GameList({
	gameToDoList,
	setGameToDoLists,
	deleteToDoItem,
	deleteGameToDoList,
	parentGame,
	// handleToggle,
}) {
	const [gameToDoItemForm, setGameToDoItemForm] = useState([]);

	const toDoListName = gameToDoList.toDoListName;

	const toDoItems = gameToDoList.toDoItems;

	const handleChange = (e) => {
		setGameToDoItemForm(e.currentTarget.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newToDoItem = {
			toDoItem: gameToDoItemForm,
			parentList: gameToDoList.id,
		};
		axios
			.put('/gameToDoLists/toDoItem', newToDoItem)
			.then((res) => setGameToDoLists(res.data))
			.catch((err) => console.log(err));

		setGameToDoItemForm('');
	};

	const deleteToDoList = (e) => {
		const toDoListToDelete = {
			toDoListId: e.currentTarget.id,
			parentGameId: parentGame,
		};
		console.log(e.currentTarget.id);
		deleteGameToDoList(toDoListToDelete);
	};

	return (
		<div className="col-xs-12 col-sm-6 col-md-4">
			<div className="p-3 border bg-light">
				<h3 className="text-center">{toDoListName}</h3>
				<button
					type="button"
					className="btn btn-secondary btn-sm"
					id={gameToDoList.id}
					onClick={deleteToDoList}
				>
					&times;
				</button>
				<form onSubmit={handleSubmit}>
					<input
						value={gameToDoItemForm}
						className="w-100 my-1 "
						type="text"
						id="new-game-input"
						name="new-game-input"
						onChange={handleChange}
						placeholder="New To Do"
					/>
				</form>

				{toDoItems.map((toDoItem) => {
					return (
						<GameToDoItem
							toDoItem={toDoItem}
							key={toDoItem.id}
							// handleToggle={handleToggle}
							deleteToDoItem={deleteToDoItem}
						/>
					);
				})}
			</div>
		</div>
	);
}
