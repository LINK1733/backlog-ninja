import React from 'react';
import GameListKeeper from './gameListKeeper';
import { useAuth0 } from '@auth0/auth0-react';

import '../styles/home.scss';

export default function Home() {
	const { isLoading } = useAuth0();
	const Loading = () => {
		return <h1 className={'loading-text my-5 text-center'}>Loading...</h1>;
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className="pt-5">
			<GameListKeeper />
		</div>
	);
}
