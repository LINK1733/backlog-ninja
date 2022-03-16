import React, { useState } from 'react';
import axios from 'axios';
import GameList from './gameList';
import '../styles/gameListKeeper.scss';
import { Form, Row } from 'react-bootstrap';

export default function GameListKeeper({
	allGameLists,
	setGameList,
	deleteGame,
	deleteGameList,
	reorderGameList,
}) {
	const [gameListForm, setGameListForm] = useState([]);

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
							gameList={gameList}
							setGameList={setGameList}
							key={gameList.id}
							deleteGame={deleteGame}
							deleteGameList={deleteGameList}
							reorderGameList={reorderGameList}
						/>
					);
				})}
			</Row>
		</div>
	);
}
