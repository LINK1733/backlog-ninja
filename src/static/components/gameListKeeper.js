import React, { useState } from 'react';
import axios from 'axios';
import GameList from './gameList';

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
			.put('/games/', newGameList)
			.then((res) => setGameList(res.data))
			.catch((err) => console.error(err));

		setGameListForm('');
	};

	return (
		<div className="">
			<form
				onSubmit={handleSubmit}
				className="container align-items-center"
			>
				<input
					value={gameListForm}
					className=" w-100 my-1 mx-auto"
					type="text"
					id="new-game-input"
					name="new-game-input"
					onChange={handleChange}
					placeholder="Enter new list, press Enter to save."
				/>
			</form>

			<div className="row gy-3 flex-wrap p-3 m-0">
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
			</div>
		</div>
	);
}
