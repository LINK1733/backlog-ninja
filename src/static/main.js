import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import GamePage from './components/gamePage';
import { ToastContainer } from 'react-toastify';
import './styles/main.scss';

function App() {
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
						<Home />
					</Route>
					<Route
						path="/games/:id"
						render={({ match }) => (
							<GamePage gameId={match.params.id} />
						)}
					/>
				</Switch>
			</div>
		</Router>
	);
}
ReactDom.render(<App />, document.querySelector('#app-root'));
