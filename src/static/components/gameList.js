import React from 'react';
import { Link } from 'react-router-dom';
import Game from './game';
import GameSearch from './gameSearch';
import RandomGame from './randomGame';
import '../styles/gameList.scss';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

export default function GameList({
	allGameLists,
	gameList,
	setGameList,
	deleteGame,
	deleteGameList,
	reorderList,
}) {
	const listName = gameList.listName;

	const games = gameList.games;

	const deleteList = (e) => {
		const gameListToDelete = {
			gameListId: e.currentTarget.id,
		};
		deleteGameList(gameListToDelete);
	};

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		const listIndex = allGameLists.findIndex((x) => x.id === gameList.id);

		const movedItemIndex = gameList.games.findIndex(
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
		const newListOrder = Array.from(gameList.games);
		newListOrder.splice(source.index, 1);
		newListOrder.splice(
			destination.index,
			0,
			gameList.games[movedItemIndex]
		);

		const reorderedList = {
			...gameList,
			games: newListOrder,
		};

		const newAllGamesList = [...allGameLists];
		newAllGamesList[listIndex] = reorderedList;
		setGameList(newAllGamesList);

		reorderList(reorderedList);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Col xs={12} sm={6} md={3} className="rounded gameList">
				<div className="py-1">
					<Row className="listHeader">
						<Col>
							<h2 className="listTitle">{listName}</h2>
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
											id={gameList.id}
											onClick={deleteList}
										>
											Delete List
											<span className="visually-hidden">
												Delete List
											</span>
										</Dropdown.Item>
									</div>
									<Dropdown.Divider />
									<RandomGame games={games} />
								</Dropdown.Menu>
							</Dropdown>
						</Col>
					</Row>

					<GameSearch gameList={gameList} setGameList={setGameList} />
					<Droppable
						droppableId={gameList.id}
						key={`droppable-${gameList.id}`}
					>
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{games.map((game) => {
									return (
										<Link
											to={`/games/${game.id}`}
											key={game.id}
											className="flex-grow-1 gameLink"
										>
											<Game
												game={game}
												key={game.id}
												deleteGame={deleteGame}
											/>
										</Link>
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
