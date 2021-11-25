import React, { useState } from 'react';
import axios from 'axios';
import GameToDoItem from './gameToDoItem';
import '../styles/gameToDoList.scss';
import { Col, Button, Form } from 'react-bootstrap';

export default function GameToDoList({
	gameToDoList,
	setGameToDoLists,
	deleteToDoItem,
	deleteGameToDoList,
	parentGame,
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
			toDoItemText: gameToDoItemForm,
			parentToDoList: gameToDoList.id,
			parentGameId: gameToDoList.parentGameId,
		};
		axios
			.put('/api/gameToDoLists/toDoItem', newToDoItem)
			.then((res) => setGameToDoLists(res.data))
			.catch((err) => console.error(err));

		setGameToDoItemForm('');
	};

	const deleteToDoList = (e) => {
		const toDoListToDelete = {
			toDoListId: e.currentTarget.id,
			parentGameId: parentGame,
		};

		deleteGameToDoList(toDoListToDelete);
	};

	return (
		<Col xs={12} sm={6} md={3} className="rounded gamePageToDoList">
			<div className="p-3">
				<h2 className="text-center">{toDoListName}</h2>
				<Button
					variant="secondary"
					size="sm"
					id={gameToDoList.id}
					onClick={deleteToDoList}
				>
					<span className="visually-hidden">Delete List</span>
					&times;
				</Button>
				<Form onSubmit={handleSubmit}>
					<Form.Control
						value={gameToDoItemForm}
						type="text"
						className="w-100 my-1 rounded px-2 py-1"
						id="new-toDoList-input"
						name="new-toDoList-input"
						onChange={handleChange}
						placeholder="New To Do"
					/>
				</Form>

				{toDoItems.map((toDoItem) => {
					return (
						<GameToDoItem
							parentGame={parentGame}
							toDoItem={toDoItem}
							key={toDoItem.id}
							deleteToDoItem={deleteToDoItem}
						/>
					);
				})}
			</div>
		</Col>
	);
}
