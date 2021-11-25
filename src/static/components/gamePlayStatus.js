import React from 'react';
import { Dropdown } from 'react-bootstrap';
import '../styles/gamePlayStatus.scss';

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
		<Dropdown>
			<Dropdown.Toggle
				className="btn dropdown-toggle"
				type="button"
				id="dropdownMenuButton1"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				{currentStatus}
			</Dropdown.Toggle>

			<Dropdown.Menu variant="dark">
				{statuses
					.filter((status) => status.id !== playStatus)
					.map((status) => {
						return (
							<Dropdown.Item
								key="status.id"
								onClick={() => {
									changePlayStatus(status.id);
								}}
							>
								{status.text}
							</Dropdown.Item>
						);
					})}
			</Dropdown.Menu>
		</Dropdown>
	);
}
