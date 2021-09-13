import React, { useState, useEffect } from 'react';

export default function GamePlayStatus({ playStatus, changePlayStatus }) {
	const [currentPlayStatus, setCurrentPlayStatus] = useState([]);

	let elements = {
		plan: document.getElementById('planToPlay'),
		drop: document.getElementById('dropped'),
		complete: document.getElementById('completed'),
		hold: document.getElementById('onHold'),
		playing: document.getElementById('currentlyPlaying'),
	};

	const displayAll = () => {
		elements.plan.style.display = 'flex';
		elements.drop.style.display = 'flex';
		elements.complete.style.display = 'flex';
		elements.hold.style.display = 'flex';
		elements.playing.style.display = 'flex';
	};

	useEffect(() => {
		if (playStatus == 'PlanToPlay') {
			setCurrentPlayStatus('Planning to Play');

			displayAll();
			elements.plan.style.display = 'none';
		} else if (playStatus == 'Dropped') {
			setCurrentPlayStatus('Dropped');

			displayAll();
			elements.drop.style.display = 'none';
		} else if (playStatus == 'Completed') {
			setCurrentPlayStatus('Completed');

			displayAll();
			elements.complete.style.display = 'none';
		} else if (playStatus == 'Playing') {
			setCurrentPlayStatus('Playing');

			displayAll();
			elements.playing.style.display = 'none';
		} else if (playStatus == 'Hold') {
			setCurrentPlayStatus('On Hold');

			displayAll();
			elements.hold.style.display = 'none';
		}
	}, [playStatus]);

	return (
		<div className="dropdown">
			<button
				className="btn btn-secondary dropdown-toggle"
				type="button"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				{currentPlayStatus}
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				<li
					className="dropdown-item"
					id="currentlyPlaying"
					onClick={changePlayStatus}
				>
					Currently Playing
				</li>
				<li
					className="dropdown-item"
					id="onHold"
					onClick={changePlayStatus}
				>
					On Hold
				</li>
				<li
					className="dropdown-item"
					id="dropped"
					onClick={changePlayStatus}
				>
					Dropped
				</li>
				<li
					className="dropdown-item"
					id="completed"
					onClick={changePlayStatus}
				>
					Completed
				</li>
				<li
					className="dropdown-item"
					id="planToPlay"
					onClick={changePlayStatus}
				>
					Planning to Play
				</li>
			</ul>
		</div>
	);
}
