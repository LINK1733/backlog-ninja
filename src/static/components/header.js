import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoutButton, LoginButton } from '../auth0';

import '../styles/header.scss';

export default function Header() {
	return (
		<header>
			<Navbar className="navBar" variant="dark" expand="lg">
				<Container className="m-auto" fluid>
					<Link to={'/'} id="navBar-home">
						<Navbar.Brand>
							<img
								alt={''}
								src={'/assets/logo.png'}
								width={'30'}
								height={'30'}
								className={'me-2'}
							/>
						</Navbar.Brand>
					</Link>
					<Navbar.Toggle />
					<Navbar.Collapse
						id="basic-navbar-nav"
						className="justify-content-end"
					>
						<LoginButton>Login</LoginButton>
						<Nav>
							<NavDropdown
								id="account-dropdown"
								menuVariant="dark"
								align="end"
								className="fa-solid fa-user d-flex align-items-center"
								title=""
							>
								<NavDropdown.Item
									className="navDropdownItem"
									href="/logout"
								>
									<LogoutButton className="navDropdownItem">
										{' '}
										New Logout
									</LogoutButton>
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
