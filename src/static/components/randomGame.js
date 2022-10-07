import React from 'react';
import { toast } from 'react-toastify';
import '../styles/randomGame.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from 'react-bootstrap';
import { filterList } from '../filter';

export default function RandomGame(gameList) {
	const { gamesWithoutFilter } = filterList(gameList, 'Dropped');

	const length = gamesWithoutFilter.length;

	const getRandomGame = () => {
		if (length > 1) {
			const randomNum = Math.floor(Math.random() * length);
			toast(`Play ${gamesWithoutFilter[randomNum].igdbGame.name}`);
		} else if (length === 1) {
			toast.warn('You need to add at least one more game to this list!');
		} else {
			toast.warn('Add a couple of playable games to your list first!');
		}
	};

	return (
		<Dropdown.Item className="randomButton" onClick={getRandomGame}>
			Don't know what to play?
		</Dropdown.Item>
	);
}
