import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../styles/header.scss';

export default function Header() {
	return (
		<header>
			<Navbar className="navBar" variant="dark" expand="lg">
				<Container className="m-auto" fluid>
					<Navbar.Brand href="/">Game Tracker</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse
						id="basic-navbar-nav"
						className="justify-content-end"
					>
						<Nav>
							<NavDropdown
								title="Account"
								id="account-dropdown"
								menuVariant="dark"
								align="end"
							>
								<NavDropdown.Item href="/change-password">
									Change Password
								</NavDropdown.Item>
								<NavDropdown.Item href="/logout">
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
