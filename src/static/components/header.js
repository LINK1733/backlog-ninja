import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../styles/header.scss';

export default function Header() {
	return (
		<header>
			<Navbar className="navBar" variant="dark" expand="lg">
				<Container className="m-auto" fluid>
					<Navbar.Brand href="/">Backlog Ninja</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse
						id="basic-navbar-nav"
						className="justify-content-end"
					>
						<Nav>
							<NavDropdown
								id="account-dropdown"
								menuVariant="dark"
								align="end"
								className="fa-solid fa-user d-flex align-items-center"
								title=""
							>
								<NavDropdown.Item
									href="/change-password"
									className="navDropdownItem"
								>
									Change Password
								</NavDropdown.Item>
								<NavDropdown.Item
									href="/logout"
									className="navDropdownItem"
								>
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
