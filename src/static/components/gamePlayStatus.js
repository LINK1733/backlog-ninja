import React from 'react';

export default function GamePlayStatus({ playStatus, changePlayStatus }) {
	const statuses = [
		{
			id: 'PlanToPlay',
			text: 'Plan to Play',
		},
		{
			id: 'Playing',
			text: 'Playing',
		},
		{
			id: 'Dropped',
			text: 'Dropped',
		},
		{
			id: 'Completed',
			text: 'Completed',
		},
		{
			id: 'Hold',
			text: 'On Hold',
		},
	];

	const currentStatus = statuses.find(
		(status) => status.id === playStatus
	)?.text;

	return (
		<div className="dropdown">
			<button
				className="btn btn-secondary dropdown-toggle"
				type="button"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				{currentStatus}
			</button>
			<ul
				className="dropdown-menu dropdown-menu-dark"
				aria-labelledby="dropdownMenuButton1"
			>
				{statuses
					.filter((status) => status.id !== playStatus)
					.map((status) => {
						return (
							<li className="" key={status.id}>
								<button
									className="dropdown-item text-center"
									onClick={() => {
										changePlayStatus(status.id);
									}}
								>
									{status.text}
								</button>
							</li>
						);
					})}
			</ul>
		</div>
	);
}
