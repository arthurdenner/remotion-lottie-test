import {AbsoluteFill, Loop, Sequence, useVideoConfig} from 'remotion';
import RemotionLottie from '../RemotionLottie';

const animationPath =
	'https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json';

const ExplodingBird = () => {
	const {height, width} = useVideoConfig();
	const birdLoops = 5;
	const birdSpeed = 2;
	const explosionSpeed = 0.5;
	const feathersSpeed = 0.8;
	// This needs to be known by the developer, can we make dynamic via prop?
	const birdNFrames = 23;
	const explosionNFrames = 11;
	const feathersNFrames = 61;
	const birdDuration = Math.floor(birdNFrames / birdSpeed);
	const explosionFrom = birdDuration * birdLoops;
	const explosionDuration = Math.floor(explosionNFrames / explosionSpeed);
	const explosionStart = birdNFrames / explosionSpeed;
	const feathersDuration = Math.floor(feathersNFrames / feathersSpeed);
	const feathersStart = explosionStart + explosionDuration;

	return (
		<AbsoluteFill style={{height, width}}>
			<Loop durationInFrames={birdDuration} times={birdLoops}>
				<RemotionLottie
					path={animationPath}
					speed={birdSpeed}
					style={{height, width}}
				/>
			</Loop>
			<Sequence from={explosionFrom} durationInFrames={explosionDuration}>
				<Sequence from={-explosionStart}>
					<RemotionLottie
						path={animationPath}
						speed={explosionSpeed}
						style={{height, width}}
					/>
				</Sequence>
			</Sequence>
			<Sequence
				from={explosionFrom + explosionDuration}
				durationInFrames={feathersDuration}
			>
				<Sequence from={-feathersStart}>
					<RemotionLottie
						path={animationPath}
						speed={feathersSpeed}
						style={{height, width}}
					/>
				</Sequence>
			</Sequence>
		</AbsoluteFill>
	);
};

export default ExplodingBird;
