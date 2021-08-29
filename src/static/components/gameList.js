import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Game from './game';

export default function GameList({
	gameList,
	setGameList,
	deleteGame,
	deleteGameList,
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
			parentList: gameList.id,
		};
		axios
			.put('/games/addGame', newGame)
			.then((res) => setGameList(res.data))
			.then(setSearchResult([]))
			.catch((err) => console.log(err));

		setGameForm('');
	};

	const deleteList = (e) => {
		const gameListToDelete = {
			gameListId: e.currentTarget.id,
		};
		deleteGameList(gameListToDelete);
	};

	return (
		<div className="col-xs-12 col-sm-6 col-md-4">
			<div className="p-3 border bg-light">
				<h2 className="text-center">{listName}</h2>
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
		</div>
	);
}
