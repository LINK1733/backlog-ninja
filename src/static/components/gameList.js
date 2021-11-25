import React from 'react';
import { Link } from 'react-router-dom';
import Game from './game';
import GameSearch from './gameSearch';
import RandomGame from './randomGame';
import '../styles/gameList.scss';
import { Row, Col, Dropdown } from 'react-bootstrap';

export default function GameList({
	gameList,
	setGameList,
	deleteGame,
	deleteGameList,
}) {
	const listName = gameList.listName;

	const games = gameList.games;

	const deleteList = (e) => {
		const gameListToDelete = {
			gameListId: e.currentTarget.id,
		};
		deleteGameList(gameListToDelete);
	};

	return (
		<Col xs={12} sm={6} md={3} className="rounded gameList">
			<div className="p-3 justify-content-center">
				<Row className="listHeader">
					<Col>
						<h2 className="listTitle">{listName}</h2>
					</Col>
					<Col xs="auto">
						<Dropdown>
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
			</div>
		</Col>
	);
}
