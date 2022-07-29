import {AbsoluteFill, Loop, Sequence, useVideoConfig} from 'remotion';
import RemotionLottie from '../RemotionLottie';
import {useLottie} from '../useLottie';

const animationPath =
	'https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json';

const ExplodingBird = () => {
	const {height, width} = useVideoConfig();
	const {animationData} = useLottie({path: animationPath});

	if (!animationData) {
		return null;
	}

	const birdLoops = 5;
	const birdSpeed = 1;
	const explosionSpeed = 0.1;
	const feathersSpeed = 0.8;
	// This needs to be known by the developer, can we make dynamic via prop?
	const birdNFrames = 23;
	const explosionNFrames = 11;
	const feathersNFrames = 61;
	const birdDuration = Math.floor(birdNFrames / birdSpeed);
	const explosionFrom = birdDuration * birdLoops;
	const explosionDuration = Math.floor(explosionNFrames / explosionSpeed);
	const explosionStart = birdNFrames / explosionSpeed;
	const feathersFrom = explosionFrom + explosionDuration;
	const feathersDuration = Math.floor(feathersNFrames / feathersSpeed);
	const feathersStart = Math.ceil(
		(birdNFrames + explosionNFrames) / feathersSpeed
	);

	return (
		<AbsoluteFill style={{height, width}}>
			<Loop durationInFrames={birdDuration} times={birdLoops}>
				<RemotionLottie
					animationData={animationData}
					speed={birdSpeed}
					style={{height, width}}
				/>
			</Loop>
			<Sequence from={explosionFrom} durationInFrames={explosionDuration}>
				<Sequence from={-explosionStart}>
					<RemotionLottie
						animationData={animationData}
						speed={explosionSpeed}
						style={{height, width}}
					/>
				</Sequence>
			</Sequence>
			<Sequence from={feathersFrom} durationInFrames={feathersDuration}>
				<Sequence from={-feathersStart}>
					<RemotionLottie
						animationData={animationData}
						speed={feathersSpeed}
						style={{height, width}}
					/>
				</Sequence>
			</Sequence>
		</AbsoluteFill>
	);
};

export default ExplodingBird;
