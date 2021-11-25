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
}) {
	const [gameListForm, setGameListForm] = useState([]);

	const handleChange = (e) => {
		setGameListForm(e.currentTarget.value);
	};

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

		e.currentTarget.value = '';
	};

	return (
		<div>
			<Form className="align-items-center" onSubmit={handleSubmit}>
				<Form.Group className="w-100 py-2 mx-auto rounded px-2 ">
					<Form.Control
						type="text"
						id="new-list-input"
						placeholder="Enter new list, press Enter to save."
						onChange={handleChange}
					/>
				</Form.Group>
			</Form>

			<Row className="gy-3 pb-3 m-0 justify-content-center">
				{allGameLists.map((gameList) => {
					return (
						<GameList
							gameList={gameList}
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
