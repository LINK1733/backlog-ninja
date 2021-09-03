import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RandomGame(games) {
	const length = games.games.length;
	const listGames = games.games;
	const getRandomGame = () => {
		if (length > 1) {
			const randomNum = Math.floor(Math.random() * length);
			toast(`Play ${listGames[randomNum].igdbGame.name}`);
		} else if (length == 1) {
			toast.warn('You need to add at least one more game to this list!');
		} else {
			toast.warn('Add a couple games to your list first!');
		}
	};

	return (
		<div>
			<button
				type="button"
				className="btn btn-secondary btn-sm"
				onClick={getRandomGame}
			>
				Don't know what to play?
			</button>
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
		</div>
	);
}
