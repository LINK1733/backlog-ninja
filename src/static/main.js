import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import './Main.scss';
import axios from 'axios';

function Home({
	gameList,
	setGameList,
	deleteGame,
	// handleToggle,
	deleteGameList,
}) {
	return (
		<div className="mt-5">
			<GameListKeeper
				allGameLists={gameList}
				setGameList={setGameList}
				// handleToggle={handleToggle}
				deleteGame={deleteGame}
				deleteGameList={deleteGameList}
			/>
		</div>
	);
}

function GameListKeeper({
	allGameLists,
	setGameList,
	deleteGame,
	// handleToggle,
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
			.catch((err) => console.log(err));

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
							// handleToggle={handleToggle}
							deleteGame={deleteGame}
							deleteGameList={deleteGameList}
						/>
					);
				})}
			</div>
		</div>
	);
}

function GameList({
	gameList,
	setGameList,
	deleteGame,
	deleteGameList,
	// handleToggle,
}) {
	const [gameForm, setGameForm] = useState([]);

	const [searchResult, setSearchResult] = useState([]);

	const listName = gameList.listName;

	const games = gameList.games;

	const handleChange = (e) => {
		setGameForm(e.currentTarget.value);
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			const searchInput = {
				searchInput: gameForm,
			};
			if (gameForm.length === 0) {
				setSearchResult(0);
			}
			if (gameForm.length) {
				axios
					.put('/games/search', searchInput)
					.then((res) => setSearchResult(res.data));
			}
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [gameForm]);

	const handleSubmit = (gameName) => (e) => {
		e.preventDefault();
		const newGame = {
			gameId: gameName.id,
			gameName: gameName.name,
			parentList: gameList.id,
		};
		axios
			.put('/games/addGame', newGame)
			.then((res) => setGameList(res.data))
			.then(setSearchResult([]))
			.catch((err) => console.log(err));

		setGameForm('');
	};

	const renderGames = () => {
		// console.log(games);
		if (games) {
			games.map((game) => {
				console.log(game);
				console.log(game.id);
				return (
					<Game
						game={game}
						key={game.id}
						// handleToggle={handleToggle}
						deleteGame={deleteGame}
					/>
				);
			});
		}
	};

	const deleteList = (e) => {
		const gameListToDelete = {
			gameListId: e.currentTarget.id,
			games: games,
		};
		console.log(e.currentTarget.id);
		deleteGameList(gameListToDelete);
	};

	return (
		<div className="col-xs-12 col-sm-6 col-md-4">
			<div className="p-3 border bg-light">
				<h3 className="text-center">{listName}</h3>
				<button
					type="button"
					className="btn btn-secondary btn-sm"
					id={gameList.id}
					onClick={deleteList}
				>
					&times;
				</button>
				<form onSubmit={handleSubmit}>
					<input
						value={gameForm}
						className="w-100 my-1 "
						type="text"
						id="new-game-input"
						name="new-game-input"
						onChange={handleChange}
						placeholder="New Game"
					/>
					{searchResult != 0 && gameForm != '' && (
						<div
							id="searchResults"
							className="shadow border bg-light p-3"
						>
							{searchResult.map((searchResult) => {
								return (
									<div
										key={searchResult.id}
										className="form-check border-bottom my-2 pb-2 gap-2"
									>
										{searchResult.cover && (
											<img
												src={searchResult.cover.replace(
													'thumb',
													'micro'
												)}
												onClick={handleSubmit(
													searchResult
												)}
												id={searchResult.id}
											/>
										)}
										<label
											onClick={handleSubmit(searchResult)}
											className="form-check-label flex-grow-1 px-2 my-auto"
											htmlFor={searchResult.id}
										>
											{searchResult.name}
										</label>
									</div>
								);
							})}
						</div>
					)}
				</form>
				{games.map((game) => {
					return (
						<Game
							game={game}
							key={game.id}
							// handleToggle={handleToggle}
							deleteGame={deleteGame}
						/>
					);
				})}
			</div>
		</div>
	);
}

function Game({ game, deleteGame }) {
	// const handleClick = (e) => {
	// 	handleToggle(e.currentTarget.id);
	// };

	const deleteItem = (e) => {
		const gameToDelete = {
			game: e.currentTarget.id,
		};
		deleteGame(gameToDelete);
	};
	let thumbnail = '';
	if (game.cover) {
		thumbnail = game.cover.replace('thumb', 'micro');
	}

	return (
		<div className="form-check border-bottom my-2 pb-2 d-flex gap-2">
			<img src={thumbnail} id={game.id} />
			<label
				className={`form-check-label flex-grow-1 my-auto ${
					game.completed ? 'strike' : ''
				}`}
				htmlFor={game.id}
			>
				{game.gameName}
			</label>
			<button
				type="button"
				className="btn btn-secondary btn-sm"
				id={game.id}
				onClick={deleteItem}
			>
				&times;
			</button>
		</div>
	);
}

function App() {
	const [gameList, setGameList] = useState([]);

	const fetchGameLists = () => {
		axios
			.get('/games')
			.then((res) => setGameList(res.data))
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchGameLists(setGameList);
	}, []);

	const deleteGameList = (gameListToDelete) => {
		axios
			.delete('/games/deleteGameList', {
				data: {
					gameListId: gameListToDelete.gameListId,
					games: gameListToDelete.games,
				},
			})
			.then((res) => setGameList(res.data));
	};

	const deleteGame = (gameToDelete) => {
		axios
			.delete('/games/deleteGame', {
				data: {
					gameId: gameToDelete.game,
					parentList: gameToDelete.parentList,
				},
			})
			.then((res) => setGameList(res.data));
	};

	// const handleToggle = (id) => {
	// 	let mapped = gameList.map((gameName) => {
	// 		return gameName.id == id
	// 			? { ...gameName, complete: !gameName.complete }
	// 			: { ...gameName };
	// 	});
	// 	setGameList(mapped);
	// };

	return (
		<Router>
			<div>
				<Header />
				<Switch>
					<Route exact path="/">
						<Home
							gameList={gameList}
							setGameList={setGameList}
							// handleToggle={handleToggle}
							deleteGame={deleteGame}
							deleteGameList={deleteGameList}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
ReactDom.render(<App />, document.querySelector('#app-root'));
