import React from 'react';
import '../styles/gameTime.scss';
import { Carousel } from 'react-bootstrap';

export default function GameTime({ gameTimes }) {
	const enableControls = !(gameTimes && gameTimes.length === 1);
	return (
		<Carousel
			interval={null}
			indicators={false}
			controls={enableControls}
			className="w-75"
		>
			{gameTimes &&
				gameTimes.map((gameTime) => {
					const style = {
						backgroundImage: `url('https://howlongtobeat.com${gameTime.imageUrl}')`,
					};

					return (
						<Carousel.Item
							style={style}
							key={gameTime.id}
							className="carouselBackground"
						>
							<Carousel.Caption>
								<p>{gameTime.name}</p>

								{gameTime.timeLabels[0] && (
									<p>
										{gameTime.timeLabels[0][1]}:{' '}
										{gameTime.gameplayMain} Hours
									</p>
								)}
								{gameTime.timeLabels[1] && (
									<p>
										{gameTime.timeLabels[1][1]}:{' '}
										{gameTime.gameplayMainExtra} Hours
									</p>
								)}
								{gameTime.timeLabels[2] && (
									<p>
										{gameTime.timeLabels[2][1]}:{' '}
										{gameTime.gameplayCompletionist} Hours
									</p>
								)}
							</Carousel.Caption>
						</Carousel.Item>
					);
				})}
		</Carousel>
	);
}
