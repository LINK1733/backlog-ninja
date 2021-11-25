import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import GamePage from './components/gamePage';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import './styles/main.scss';

function App() {
	const [gameList, setGameList] = useState([]);

	const fetchGameLists = () => {
		axios
			.get('/api/games')
			.then((res) => setGameList(res.data))
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchGameLists(setGameList);
	}, []);

	const deleteGameList = (gameListToDelete) => {
		axios
			.delete('/api/games/deleteGameList', {
				data: {
					gameListId: gameListToDelete.gameListId,
				},
			})
			.then((res) => setGameList(res.data));
	};

	const deleteGame = (gameToDelete) => {
		axios
			.delete('/api/games/deleteGame', {
				data: {
					gameId: gameToDelete.game,
					parentList: gameToDelete.parentList,
				},
			})
			.then((res) => setGameList(res.data));
	};

	return (
		<Router>
			<div id="mainBackground">
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
				<Header />
				<Switch>
					<Route exact path="/">
						<Home
							gameList={gameList}
							setGameList={setGameList}
							deleteGame={deleteGame}
							deleteGameList={deleteGameList}
						/>
					</Route>
					<Route
						path="/games/:id"
						render={({ match }) => (
							<GamePage game={match.params.id} />
						)}
					/>
				</Switch>
			</div>
		</Router>
	);
}
ReactDom.render(<App />, document.querySelector('#app-root'));
