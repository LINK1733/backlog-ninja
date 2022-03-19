import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameList from './gameList';
import '../styles/gameListKeeper.scss';
import { Form, Row } from 'react-bootstrap';

export default function GameListKeeper() {
	const [gameListForm, setGameListForm] = useState([]);

	const [allGameLists, setGameList] = useState([]);

	const fetchGameLists = () => {
		axios
			.get('/api/games')
			.then((res) => setGameList(res.data))
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchGameLists(setGameList);
	}, []);

	const deleteGameList = (gameListToDelete) => {
		axios
			.delete('/api/games/deleteGameList', {
				data: {
					gameListId: gameListToDelete.gameListId,
				},
			})
			.then((res) => setGameList(res.data));
	};

	const deleteGame = (gameToDelete) => {
		axios
			.delete('/api/games/deleteGame', {
				data: {
					gameId: gameToDelete.game,
					parentListId: gameToDelete.parentListId,
				},
			})
			.then((res) => setGameList(res.data));
	};

	const handleChange = (e) => {
		setGameListForm(e.currentTarget.value);
	};

	// For new game lists
	const handleSubmit = (e) => {
		e.preventDefault();

		const newGameList = {
			listName: gameListForm,
		};
		axios
			.put('/api/games/', newGameList)
			.then((res) => setGameList(res.data))
			.catch((err) => console.error(err));

		setGameListForm('');

		e.currentTarget.reset();
	};

	return (
		<div>
			<Row className="gy-3 pb-3 me-0 justify-content-center">
				<Form className="align-items-center" onSubmit={handleSubmit}>
					<Form.Group className="w-25 py-2 mx-auto rounded px-2 ">
						<Form.Control
							type="text"
							id="new-list-input"
							placeholder="Enter new list, press Enter to save."
							onChange={handleChange}
						/>
					</Form.Group>
				</Form>
				{allGameLists.map((gameList) => {
					return (
						<GameList
							allGameLists={allGameLists}
							currentGameList={gameList}
							setGameList={setGameList}
							key={gameList.id}
							deleteGame={deleteGame}
							deleteGameList={deleteGameList}
						/>
					);
				})}
			</Row>
		</div>
	);
}
