import React, { useState } from 'react';
import axios from 'axios';
import GameToDoItem from './gameToDoItem';
import '../styles/gameToDoList.scss';
import { Col, Form, Dropdown, Row } from 'react-bootstrap';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

export default function GameToDoList({
	allToDoLists,
	gameToDoList,
	setGameToDoLists,
	deleteToDoItem,
	deleteGameToDoList,
	parentGameId,
	reorderToDoList,
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
			listLength: gameToDoList.toDoItems.length,
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
			parentGameId: parentGameId,
		};

		deleteGameToDoList(toDoListToDelete);
	};

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		const listIndex = allToDoLists.findIndex(
			(x) => x.id === gameToDoList.id
		);

		const movedItemIndex = gameToDoList.toDoItems.findIndex(
			(x) => x.id === draggableId
		);

		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		const newListOrder = Array.from(gameToDoList.toDoItems);
		newListOrder.splice(source.index, 1);
		newListOrder.splice(
			destination.index,
			0,
			gameToDoList.toDoItems[movedItemIndex]
		);

		const reorderedToDoList = {
			...gameToDoList,
			toDoItems: newListOrder,
		};

		const newAllGameToDoList = [...allToDoLists];
		newAllGameToDoList[listIndex] = reorderedToDoList;
		setGameToDoLists(newAllGameToDoList);

		reorderToDoList(reorderedToDoList);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Col xs={12} sm={6} md={3} className="rounded gamePageToDoList">
				<div className="py-1">
					<Row className="listHeader">
						<Col>
							<h2 className="text-center">{toDoListName}</h2>
						</Col>
						<Col xs="auto">
							<Dropdown className="pt-2">
								<Dropdown.Toggle className="fas fa-bars dropdownButton" />
								<Dropdown.Menu
									variant="dark"
									className="listDropdown"
								>
									<div>
										<Dropdown.Item
											id={gameToDoList.id}
											onClick={deleteToDoList}
										>
											Delete List
											<span className="visually-hidden">
												Delete List
											</span>
										</Dropdown.Item>
									</div>
								</Dropdown.Menu>
							</Dropdown>
						</Col>
					</Row>

					<Form onSubmit={handleSubmit}>
						<Form.Control
							value={gameToDoItemForm}
							type="text"
							className="w-100 my-1 rounded px-2 py-1"
							id="new-toDoList-input"
							name="new-toDoList-input"
							onChange={handleChange}
							placeholder="Add To-Do"
							required
						/>
					</Form>

					<Droppable
						droppableId={gameToDoList.id}
						key={`droppable-${gameToDoList.id}`}
					>
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{toDoItems.map((toDoItem) => {
									return (
										<GameToDoItem
											parentGameId={parentGameId}
											parentListId={gameToDoList.id}
											toDoItem={toDoItem}
											key={toDoItem.id}
											deleteToDoItem={deleteToDoItem}
											setGameToDoLists={setGameToDoLists}
										/>
									);
								})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			</Col>
		</DragDropContext>
	);
}
