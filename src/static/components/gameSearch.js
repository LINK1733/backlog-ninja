import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GameSearch({ gameList, setGameList }) {
	const [gameForm, setGameForm] = useState([]);

	const [searchResult, setSearchResult] = useState([]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			const searchInput = {
				searchInput: gameForm,
			};
			if (gameForm.length === 0) {
				setSearchResult([]);
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

	const handleChange = (e) => {
		setGameForm(e.currentTarget.value);
	};
	return (
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
				<div id="searchResults" className="shadow border bg-light p-3">
					{searchResult.map((searchResult) => {
						return (
							<div
								key={searchResult.id}
								className="form-check border-bottom my-2 pb-2 gap-2"
							>
								<button
									className={
										'btn form-check-label px-2 flex-grow-1 my-auto gameLink'
									}
								>
									{searchResult.cover && (
										<img
											src={searchResult.cover.replace(
												'thumb',
												'micro'
											)}
											onClick={handleSubmit(searchResult)}
											id={searchResult.id}
										/>
									)}
									<span
										onClick={handleSubmit(searchResult)}
										className="form-check-label flex-grow-1
										px-2 my-auto"
									>
										{searchResult.name}
									</span>
								</button>
							</div>
						);
					})}
				</div>
			)}
		</form>
	);
}
