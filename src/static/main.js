import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import GamePage from './components/gamePage';
import { ToastContainer } from 'react-toastify';
import './styles/main.scss';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
	return (
		<Auth0Provider
			domain={process.env.AUTH0DOMAIN}
			clientId={process.env.AUTH0CLIENTID}
			redirectUri={window.location.origin}
		>
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
		</Auth0Provider>
	);
}
ReactDom.render(<App />, document.querySelector('#app-root'));
