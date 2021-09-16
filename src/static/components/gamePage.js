import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameToDoList from './gameToDoList';
import GamePlayStatus from './gamePlayStatus';

export default function GamePage({ game }) {
	const [gameToDoLists, setGameToDoLists] = useState([]);

	const [gamePageInfo, setGamePageInfo] = useState([]);

	const [gameToDoListForm, setGameToDoListForm] = useState([]);

	const handleChange = (e) => {
		setGameToDoListForm(e.currentTarget.value);
	};

	const changePlayStatus = (playStatus) => {
		const newPlayStatus = {
			newPlayStatus: playStatus,
			game: game,
		};

		axios
			.put('/gameToDoLists/updatePlayStatus/', newPlayStatus)
			.then((res) => setGamePageInfo(res.data))
			.catch((err) => console.error(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newGameToDoList = {
			toDoListName: gameToDoListForm,
			parentGameId: game,
		};
		axios
			.put('/gameToDoLists/', newGameToDoList)
			.then((res) => setGameToDoLists(res.data))
			.catch((err) => console.error(err));

		setGameToDoListForm('');
	};

	let cover = '';

	let igdbGame = [];

	const fetchGameToDoLists = () => {
		axios
			.get('/gameToDoLists', {
				params: { parentGameId: game },
			})
			.then((res) => setGameToDoLists(res.data))
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchGamePage = async () => {
		await axios
			.get(`/games/${game}/getGamePage`)
			.then((res) => setGamePageInfo(res.data))
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchGamePage(setGamePageInfo);
		fetchGameToDoLists(setGameToDoLists);
	}, []);

	const deleteGameToDoList = (gameToDoListToDelete) => {
		axios
			.delete('/gameToDoLists', {
				data: {
					toDoListId: gameToDoListToDelete.toDoListId,
					parentGameId: gameToDoListToDelete.parentGameId,
				},
			})
			.then((res) => setGameToDoLists(res.data));
	};

	const deleteToDoItem = (toDoItemToDelete) => {
		axios
			.delete('/gameToDoLists/toDoItem', {
				data: {
					toDoItemId: toDoItemToDelete,
				},
			})
			.then((res) => setGameToDoLists(res.data));
	};

	if (gamePageInfo.igdbGame) {
		igdbGame = gamePageInfo.igdbGame;
		cover = igdbGame.cover.replace('thumb', 'cover_big');
	}

	return (
		<div className="mt-5 container align-items-center">
			<img src={cover} id={igdbGame.id} />
			<h1 className="d-inline p-5">{igdbGame.name}</h1>
			<GamePlayStatus
				playStatus={gamePageInfo.playStatus}
				changePlayStatus={changePlayStatus}
			/>
			<br />

			<form
				onSubmit={handleSubmit}
				className="container align-items-center"
			>
				<input
					value={gameToDoListForm}
					className=" w-100 my-1 mx-auto"
					type="text"
					id="new-game-to-do-list-input"
					name="new-game-to-do-list-input"
					onChange={handleChange}
					placeholder="Enter new to do list, press Enter to save."
				/>
			</form>

			<div className="row gy-3 flex-wrap p-3 m-0">
				{gameToDoLists.map((gameToDoList) => {
					return (
						<GameToDoList
							gameToDoList={gameToDoList}
							setGameToDoLists={setGameToDoLists}
							key={gameToDoList.id}
							deleteToDoItem={deleteToDoItem}
							deleteGameToDoList={deleteGameToDoList}
							parentGame={game}
						/>
					);
				})}
			</div>
		</div>
	);
}
