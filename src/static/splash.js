import ReactDom from 'react-dom';
import React, { useEffect } from 'react';
import axios from 'axios';
import './styles/splash.scss';
import './styles/header.scss';

import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { Container, Col, Row, Navbar, Button } from 'react-bootstrap';

const RegisterButton = () => {
	const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
		useAuth0();

	const loginOnClick = async () => {
		await loginWithRedirect({ screen_hint: 'signup' });
	};

	const getUserInfoAfterAuth = async () => {
		const accessToken = await getAccessTokenSilently();
		axios.post('/login', { accessToken: accessToken }).then(() => {
			window.location.reload();
		});
	};

	useEffect(() => {
		return () => {
			getUserInfoAfterAuth();
		};
	}, [isAuthenticated]);

	return (
		!isAuthenticated && (
			<Button variant={'primary'} onClick={loginOnClick}>
				Get Started
			</Button>
		)
	);
};

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
		useAuth0();

	const loginOnClick = async () => {
		await loginWithRedirect();
	};

	const getUserInfoAfterAuth = async () => {
		const accessToken = await getAccessTokenSilently();
		axios.post('/login', { accessToken: accessToken }).then(() => {
			window.location.reload();
		});
	};

	useEffect(() => {
		return () => {
			getUserInfoAfterAuth();
		};
	}, [isAuthenticated]);

	return (
		!isAuthenticated && (
			<Button variant={'primary'} onClick={loginOnClick}>
				Login
			</Button>
		)
	);
};

function Splash() {
	return (
		<Auth0Provider
			domain={process.env.AUTH0DOMAIN}
			clientId={process.env.AUTH0CLIENTID}
			redirectUri={process.env.AUTH0REDIRECTURI}
		>
			<header>
				<Navbar className="navBar" variant="dark" expand="lg">
					<Container className="m-auto" fluid>
						<Navbar.Brand>
							<img
								alt={''}
								src={'/assets/logo.png'}
								width={'30'}
								height={'30'}
								className={'me-2'}
							/>
						</Navbar.Brand>
						<LoginButton />
					</Container>
				</Navbar>
			</header>

			<Container>
				<Row
					className={
						'd-flex align-items-center justify-content-center flex-column'
					}
				>
					<Col xl={6} className={'text-center '}>
						<h1 className="text-center pt-5 pb-4 fw-bold">
							Take out your backlog one game at a time with
							Backlog Ninja
						</h1>
						<RegisterButton />
					</Col>
				</Row>
				<Row>
					<Col>
						<h3 className={'fw-bold text-center mt-5 mb-3'}>
							Organize your backlog
						</h3>
						<img
							id={'example-img'}
							className={'rounded mx-auto d-block my-2'}
							src={'/assets/listExamples.jpg'}
						/>
					</Col>
				</Row>
			</Container>
			<footer className={'mt-4 fw-bold text-center'}>
				©2022 Backlog Ninja is a work in progress by LINK1733
			</footer>
		</Auth0Provider>
	);
}

ReactDom.render(<Splash />, document.querySelector('#splash'));
