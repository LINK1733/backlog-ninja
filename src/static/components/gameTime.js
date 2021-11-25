import React from 'react';
import '../styles/gameTime.scss';
import { Carousel } from 'react-bootstrap';

export default function GameTime({ gameTimes }) {
	return (
		<Carousel interval={null} indicators={false} className="w-75">
			{gameTimes &&
				gameTimes.map((gameTime, i) => {
					const style = {
						backgroundImage: `url('https://howlongtobeat.com${gameTime.imageUrl}')`,
					};
					return (
						<Carousel.Item
							style={style}
							key={gameTime.id}
							className="carouselBackground"
						>
							{/* <img
								src={
									'https://howlongtobeat.com' +
									gameTime.imageUrl
								}
								className="w-100 rounded"
							/> */}
							<Carousel.Caption>
								<p>{gameTime.name}</p>
								<p>
									{gameTime.timeLabels[0][1]}:{' '}
									{gameTime.gameplayMain} Hours
								</p>
								<p>
									{gameTime.timeLabels[1][1]}:{' '}
									{gameTime.gameplayMainExtra} Hours
								</p>
								<p>
									{gameTime.timeLabels[2][1]}:{' '}
									{gameTime.gameplayCompletionist} Hours
								</p>
							</Carousel.Caption>
						</Carousel.Item>
					);
				})}
		</Carousel>
	);
}
