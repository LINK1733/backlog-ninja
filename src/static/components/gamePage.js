import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameToDoList from './gameToDoList';
import GamePlayStatus from './gamePlayStatus';
import '../styles/gamePage.scss';
import GameTime from './gameTime';
import { Col, Container, Image, Row, Form } from 'react-bootstrap';

export default function GamePage({ gameId }) {
	const [gameToDoLists, setGameToDoLists] = useState([]);

	const [gamePageInfo, setGamePageInfo] = useState([]);

	const [gameToDoListForm, setGameToDoListForm] = useState([]);

	const handleChange = (e) => {
		setGameToDoListForm(e.currentTarget.value);
	};

	const changePlayStatus = (playStatus) => {
		const newPlayStatus = {
			newPlayStatus: playStatus,
			game: gameId,
		};

		axios
			.put('/api/gameToDoLists/updatePlayStatus/', newPlayStatus)
			.then((res) => setGamePageInfo(res.data))
			.catch((err) => console.error(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newGameToDoList = {
			toDoListName: gameToDoListForm,
			parentGameId: gameId,
		};
		axios
			.put('/api/gameToDoLists/', newGameToDoList)
			.then((res) => setGameToDoLists(res.data))
			.catch((err) => console.error(err));

		setGameToDoListForm('');
	};

	let cover = '';

	let igdbGame = [],
		gameMode = [],
		genre = [],
		playerPerspective = [],
		summary = '',
		theme = [];

	const fetchGameToDoLists = () => {
		axios
			.get('/api/gameToDoLists', {
				params: { parentGameId: gameId },
			})
			.then((res) => setGameToDoLists(res.data))
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchGamePage = async () => {
		await axios
			.get(`/api/games/${gameId}/getGamePage`)
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
			.delete('/api/gameToDoLists', {
				data: {
					toDoListId: gameToDoListToDelete.toDoListId,
					parentGameId: gameToDoListToDelete.parentGameId,
				},
			})
			.then((res) => setGameToDoLists(res.data));
	};

	const deleteToDoItem = (toDoItemToDelete) => {
		axios
			.delete('/api/gameToDoLists/toDoItem', {
				data: {
					toDoItemId: toDoItemToDelete.toDoItemId,
					parentListId: toDoItemToDelete.parentListId,
					parentGameId: toDoItemToDelete.parentGameId,
				},
			})
			.then((res) => setGameToDoLists(res.data));
	};

	if (gamePageInfo.igdbGame) {
		igdbGame = gamePageInfo.igdbGame;
		gameMode = gamePageInfo.igdbGame.gameMode;
		genre = gamePageInfo.igdbGame.genre;
		playerPerspective = gamePageInfo.igdbGame.playerPerspective;
		theme = gamePageInfo.igdbGame.theme;
		summary = gamePageInfo.igdbGame.summary;

		cover = igdbGame.cover.replace('thumb', 'cover_big');
	}

	return (
		<Container fluid className="p-5">
			<div className="justify-content-center">
				<Row>
					<Col lg="2">
						<Image
							src={cover}
							id={igdbGame.id}
							rounded
							className="w-100"
						/>
					</Col>
					<Col lg="7">
						<div className="flex-grow-1 ">
							<Row>
								<Col>
									<h1 id="gamePageName">{igdbGame.name}</h1>
								</Col>
								<Col sm="auto">
									<GamePlayStatus
										playStatus={gamePageInfo.playStatus}
										changePlayStatus={changePlayStatus}
									/>
								</Col>
							</Row>
							{playerPerspective &&
								playerPerspective.map((playerPerspective) => {
									return (
										<h5
											className="badge rounded-pill tagPill me-1"
											key={
												playerPerspective
													.playerPerspective.id
											}
										>
											{
												playerPerspective
													.playerPerspective.name
											}
										</h5>
									);
								})}
							{gameMode &&
								gameMode.map((gameMode) => {
									return (
										<h5
											className="badge rounded-pill tagPill me-1"
											key={gameMode.gameMode.id}
										>
											{gameMode.gameMode.name}
										</h5>
									);
								})}
							{genre &&
								genre.map((genre) => {
									return (
										<h5
											className="badge rounded-pill tagPill me-1"
											key={genre.genre.id}
										>
											{genre.genre.name}
										</h5>
									);
								})}

							{theme &&
								theme.map((theme) => {
									return (
										<h5
											className="badge rounded-pill tagPill me-1"
											key={theme.theme.id}
										>
											{theme.theme.name}
										</h5>
									);
								})}
							<p id="gameSummary">{summary}</p>
						</div>
					</Col>
					<Col>
						<GameTime gameTimes={gamePageInfo.hltbTime} />
					</Col>
				</Row>
			</div>
			<br />
			<Form
				onSubmit={handleSubmit}
				className="container align-items-center"
			>
				<Form.Control
					value={gameToDoListForm}
					type="text"
					className="w-100 my-1 mx-auto rounded shadow px-2 py-1"
					id="new-gameToDoList-input"
					onChange={handleChange}
					placeholder="Enter new to do list, press Enter to save."
				/>
			</Form>
			<Row className="gy-3 pb-3 m-0 justify-content-center">
				{gameToDoLists.map((gameToDoList) => {
					return (
						<GameToDoList
							allToDoLists={gameToDoLists}
							gameToDoList={gameToDoList}
							setGameToDoLists={setGameToDoLists}
							key={gameToDoList.id}
							deleteToDoItem={deleteToDoItem}
							deleteGameToDoList={deleteGameToDoList}
							parentGameId={gameId}
						/>
					);
				})}
			</Row>
		</Container>
	);
}
