import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();

	return (
		isAuthenticated && (
			<button
				onClick={() => logout({ returnTo: window.location.origin })}
			>
				Log Out
			</button>
		)
	);
};

export const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	return (
		!isAuthenticated && (
			<button onClick={() => loginWithRedirect()}>Log In</button>
		)
	);
};
