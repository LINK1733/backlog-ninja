import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/gameSearch.scss';
import { Form, Button } from 'react-bootstrap';

export default function GameSearch({ gameList, setGameList }) {
	const [searchFormInput, setSearchFormInput] = useState('');

	const [searchResult, setSearchResult] = useState([]);

	const [isSearching, setSearching] = useState(false);

	const searchFormRef = useRef(null);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setSearching(true);

			const searchInput = {
				searchInput: searchFormInput,
				gameListGames: gameList.games,
			};
			if (searchFormInput.length === 0) {
				setSearchResult([]);
			} else {
				axios
					.put('/api/games/search', searchInput)
					.then((res) => setSearchResult(res.data))
					.then(() => setSearching(false));
			}
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [searchFormInput]);

	const handleSubmit = (gameName) => (e) => {
		e.preventDefault();
		const newGame = {
			gameId: gameName.id,
			parentList: gameList.id,
			listLength: gameList.games.length,
		};
		axios
			.put('/api/games/addGame', newGame)
			.then((res) => setGameList(res.data))
			.then(setSearchResult([]))
			.catch((err) => console.error(err));

		setSearchFormInput('');

		searchFormRef.current.value = '';
	};

	const handleChange = (e) => {
		setSearchFormInput(e.currentTarget.value);
	};
	return (
		<Form onSubmit={handleSubmit} autoComplete="off">
			<Form.Control
				type="text"
				id="new-game-input"
				className="w-100 my-1 rounded  px-2 py-1 form"
				name="new-game-input"
				onChange={handleChange}
				placeholder="Add Game"
				ref={searchFormRef}
			/>
			{isSearching && searchFormInput !== '' ? (
				<div id="searchResults" className="rounded p-1">
					<div className="form-check border-bottom my-1 pb-1 gap-1 justify-content-start">
						<Button variant="link" className="searchResult">
							<div
								className="spinner-border spinner-border-sm"
								role="status"
							/>
							<span
								id="searchResultName"
								className="form-check-label flex-grow-1
										px-2 my-auto"
							>
								Searching...
							</span>
						</Button>
					</div>
				</div>
			) : (
				<>
					{searchResult.length !== 0 && searchFormInput !== '' && (
						<div id="searchResults" className="rounded px-3">
							{searchResult.map((searchResult) => {
								return (
									<div
										key={searchResult.id}
										className="form-check border-bottom my-1 pb-1"
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
													onClick={handleSubmit(
														searchResult
													)}
													id={searchResult.id}
													alt={
														'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png'
													}
												/>
											)}
											<span
												id="searchResultName"
												onClick={handleSubmit(
													searchResult
												)}
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
					{searchResult.length === 0 && searchFormInput !== '' && (
						<div id="searchResults" className="rounded p-1">
							<div className="form-check border-bottom my-1 pb-1 gap-1 justify-content-start">
								<Button variant="link" className="searchResult">
									<span
										id="searchResultName"
										className="form-check-label flex-grow-1
										px-2 my-auto"
									>
										No Results
									</span>
								</Button>
							</div>
						</div>
					)}
				</>
			)}
		</Form>
	);
}
