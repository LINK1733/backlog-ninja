import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Game from './game';
import GameSearch from './gameSearch';
import RandomGame from './randomGame';
import '../styles/gameList.scss';
import { Row, Col, Dropdown, Button } from 'react-bootstrap';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import { alphabetSort, alphabetCompletedSort, reorderList } from '../sort';
import DeleteListModal from './deleteListModal';
import { filterList } from '../filter';

export default function GameList({
	allGameLists,
	currentGameList,
	setGameList,
	deleteGame,
	deleteGameList,
}) {
	const listName = currentGameList.listName;

	const [expanded, setExpanded] = useState(false);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const deleteList = () => {
		setShow(false);
		const gameListToDelete = {
			gameListId: currentGameList.id,
		};
		deleteGameList(gameListToDelete);
	};

	let { gamesWithoutFilter, gamesWithFilter } = filterList(
		currentGameList,
		'Completed'
	);

	const games = expanded
		? currentGameList.games
		: currentGameList.games.slice(0, 8);

	const onDragEnd = (result) => {
		const reorderProps = {
			route: '/api/games/reorderGames',
			currentList: currentGameList,
			result: result,
			allLists: allGameLists,
			listItems: currentGameList.games,
			reorderSource: 'games',
		};
		reorderList(reorderProps, setGameList);
	};

	const sortList = () => {
		const sortProps = {
			route: '/api/games/reorderGames',
			currentList: currentGameList,
			reorderSource: 'games',
		};
		alphabetSort(sortProps, setGameList);
	};
	const sortListCompletedAtBottom = () => {
		const sortProps = {
			route: '/api/games/reorderGames',
			currentList: currentGameList,
			completedGames: gamesWithFilter,
			incompleteGames: gamesWithoutFilter,
			reorderSource: 'games',
		};
		alphabetCompletedSort(sortProps, setGameList);
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
											id={currentGameList.id}
											onClick={handleShow}
										>
											Delete List
											<span className="visually-hidden">
												Delete List
											</span>
										</Dropdown.Item>
									</div>
									<Dropdown.Divider />
									<RandomGame games={gamesWithoutFilter} />
									<Dropdown.Divider />
									<div>
										<Dropdown.Item
											id={`sortCompleted-${currentGameList.id}`}
											onClick={sortListCompletedAtBottom}
										>
											Sort Incomplete Games A-Z
											<span className="visually-hidden">
												Sort Incomplete Games A-Z
											</span>
										</Dropdown.Item>
										<Dropdown.Divider />

										<Dropdown.Item
											id={`sort-${currentGameList.id}`}
											onClick={sortList}
										>
											Sort A-Z
											<span className="visually-hidden">
												Sort A-Z
											</span>
										</Dropdown.Item>
									</div>
								</Dropdown.Menu>
							</Dropdown>
						</Col>
					</Row>

					<GameSearch
						gameList={currentGameList}
						setGameList={setGameList}
					/>
					<Droppable
						droppableId={currentGameList.id}
						key={`droppable-${currentGameList.id}`}
					>
						{(provided) => (
							<div
								id={'listDiv'}
								className={'d-grid'}
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{games.map((game) => {
									return (
										<Link
											to={`/games/${game.id}`}
											key={game.id}
											className={`flex-grow-1 gameLink ${
												game.playStatus === 'Completed'
													? 'completedGame'
													: 'incompleteGame'
											}`}
										>
											<Game
												game={game}
												key={game.id}
												deleteGame={deleteGame}
											/>
										</Link>
									);
								})}
								{currentGameList.games.length > 8 && (
									<Button
										variant={'link'}
										id={'expandButton'}
										className="flex-grow-1 my-auto"
										onClick={() => setExpanded(!expanded)}
									>
										{expanded ? 'Show Less' : 'Show More'}
									</Button>
								)}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			</Col>
			<DeleteListModal
				show={show}
				handleClose={handleClose}
				deleteList={deleteList}
			/>
		</DragDropContext>
	);
}
