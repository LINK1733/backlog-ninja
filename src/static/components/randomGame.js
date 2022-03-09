import React from 'react';
import { toast } from 'react-toastify';
import '../styles/randomGame.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from 'react-bootstrap';

export default function RandomGame(games) {
	const length = games.games.length;
	const listGames = games.games;
	const getRandomGame = () => {
		if (length > 1) {
			const randomNum = Math.floor(Math.random() * length);
			toast(`Play ${listGames[randomNum].igdbGame.name}`);
		} else if (length === 1) {
			toast.warn('You need to add at least one more game to this list!');
		} else {
			toast.warn('Add a couple games to your list first!');
		}
	};

	return (
		<Dropdown.Item className="randomButton" onClick={getRandomGame}>
			Don't know what to play?
		</Dropdown.Item>
	);
}
