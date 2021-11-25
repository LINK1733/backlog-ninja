import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/gameSearch.scss';
import { Form, Button } from 'react-bootstrap';

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
					.put('/api/games/search', searchInput)
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
			.put('/api/games/addGame', newGame)
			.then((res) => setGameList(res.data))
			.then(setSearchResult([]))
			.catch((err) => console.error(err));

		setGameForm('');
	};

	const handleChange = (e) => {
		setGameForm(e.currentTarget.value);
	};
	return (
		<Form onSubmit={handleSubmit} autoComplete="off">
			<Form.Control
				type="text"
				id="new-game-input"
				className="w-100 my-1 rounded shadow px-2 py-1"
				name="new-game-input"
				onChange={handleChange}
				placeholder="New Game"
			/>
			{searchResult.length != 0 && gameForm != '' && (
				<div id="searchResults" className="rounded p-3">
					{searchResult.map((searchResult) => {
						return (
							<div
								key={searchResult.id}
								className="form-check border-bottom my-2 pb-2 gap-2 justify-content-start"
							>
								<Button
									variant="link"
									className="searchResult px-2 flex-grow-1 my-auto"
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
										id="searchResultName"
										onClick={handleSubmit(searchResult)}
										className="form-check-label flex-grow-1
										px-2 my-auto"
									>
										{searchResult.name}
									</span>
								</Button>
							</div>
						);
					})}
				</div>
			)}
		</Form>
	);
}
