import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/gameToDoItem.scss';
import { Draggable } from 'react-beautiful-dnd';

export default function GameToDoItem({
	parentGameId,
	parentListId,
	toDoItem,
	deleteToDoItem,
	setGameToDoLists,
}) {
	const [toDoText, setToDoText] = useState(toDoItem.taskText);

	const [dotStyle, setDotStyle] = useState();

	const deleteToDo = (e) => {
		const toDoItemToDelete = {
			toDoItemId: e.currentTarget.id,
			parentListId: parentListId,
			parentGameId: parentGameId,
		};
		deleteToDoItem(toDoItemToDelete);
	};

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

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			const editedToDo = {
				editedToDo: toDoText,
				toDoItemId: toDoItem.id,
				parentGameId: parentGameId,
			};
			if (toDoText !== toDoItem.taskText) {
				axios
					.patch('/api/gameToDoLists/toDoItem', editedToDo)
					.then((res) => setGameToDoLists(res.data));
			}
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [toDoText]);

	const handleChange = (e) => {
		setToDoText(e.currentTarget.innerHTML);
	};

	const preventEnter = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	return (
		<Draggable
			draggableId={toDoItem.id}
			key={`draggable-${toDoItem.id}`}
			index={toDoItem.listPosition}
			disableInteractiveElementBlocking={true}
		>
			{(provided) => (
				<div
					className="form-check border-bottom border-secondary pb-1 d-flex align-items-center justify-content-between"
					{...provided.draggableProps}
					ref={provided.innerRef}
					id={'toDoDiv'}
					onMouseDown={showDots}
				>
					<i
						className="fa-solid fa-grip-vertical verticalMoveDots"
						{...provided.dragHandleProps}
						style={dotStyle}
					/>
					<span
						id="toDoText"
						className="form-check-label px-2 flex-grow-1 my-auto"
						contentEditable
						suppressContentEditableWarning={true}
						onBlur={handleChange}
						onKeyDown={preventEnter}
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
			)}
		</Draggable>
	);
}
