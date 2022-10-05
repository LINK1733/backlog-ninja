import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
					<Routes>
						<Route exact path="/" element={<Home />}></Route>
						<Route path="/games/:id" element={<GamePage />} />
					</Routes>
				</div>
			</Router>
		</Auth0Provider>
	);
}
const root = ReactDom.createRoot(document.querySelector('#app-root'));
root.render(<App />);
