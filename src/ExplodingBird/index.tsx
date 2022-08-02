import {useEffect, useState} from 'react';
import {
	AbsoluteFill,
	Loop,
	Sequence,
	continueRender,
	delayRender,
	useVideoConfig,
} from 'remotion';
import RemotionLottie from '../RemotionLottie';

const paths = {
	// Credits: Christina Bublyk, Viktor Anisimov, Daniel Teasdale
	// Source: https://lottiefiles.com/blog/tips-and-tutorials/how-to-chain-interactions-lottie-interactivity
	bird: 'https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json',
	// Credits: https://lottiefiles.com/34191-end-color
	end: 'https://assets4.lottiefiles.com/private_files/lf30_uezjhwrv.json',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PathsData = Record<keyof typeof paths, any> | null;

const ExplodingBird = () => {
	const {height, width} = useVideoConfig();
	const [animationData, setAnimationData] = useState<PathsData>(null);
	const [handle] = useState(delayRender);

	useEffect(() => {
		Promise.all([
			fetch(paths.bird).then((res) => res.json()),
			fetch(paths.end).then((res) => res.json()),
		]).then(([bird, end]) => setAnimationData({bird, end}));
	}, []);

	useEffect(() => {
		if (animationData) {
			continueRender(handle);
		}
	}, [animationData, handle]);

	// This needs to be known by the developer, can we make dynamic via prop?
	const birdNFrames = 23;
	const explosionNFrames = 11;
	const feathersNFrames = 61;
	// Computed variables
	const birdLoops = 6;
	const birdSpeed = 2;
	const explosionSpeed = 0.1;
	const feathersSpeed = 0.8;
	const birdDuration = Math.floor(birdNFrames / birdSpeed);
	const explosionFrom = birdDuration * birdLoops;
	const explosionDuration = Math.floor(explosionNFrames / explosionSpeed);
	const explosionStart = birdNFrames / explosionSpeed;
	const feathersFrom = explosionFrom + explosionDuration;
	const feathersDuration = Math.floor(feathersNFrames / feathersSpeed);
	const feathersStart = Math.ceil(
		(birdNFrames + explosionNFrames) / feathersSpeed
	);
	const endFrom = feathersFrom + feathersDuration;

	return (
		<AbsoluteFill style={{height, width}}>
			{animationData?.bird ? (
				<>
					<Loop durationInFrames={birdDuration} times={birdLoops}>
						<RemotionLottie
							animationData={animationData.bird}
							speed={birdSpeed}
							style={{height, width}}
						/>
					</Loop>
					<Sequence from={explosionFrom} durationInFrames={explosionDuration}>
						<Sequence from={-explosionStart}>
							<RemotionLottie
								animationData={animationData.bird}
								speed={explosionSpeed}
								style={{height, width}}
							/>
						</Sequence>
					</Sequence>
					<Sequence from={feathersFrom} durationInFrames={feathersDuration}>
						<Sequence from={-feathersStart}>
							<RemotionLottie
								animationData={animationData.bird}
								speed={feathersSpeed}
								style={{height, width}}
							/>
						</Sequence>
					</Sequence>
				</>
			) : null}
			{animationData?.end ? (
				<Sequence from={endFrom}>
					<RemotionLottie
						animationData={animationData.end}
						speed={2}
						style={{height, width}}
					/>
				</Sequence>
			) : null}
		</AbsoluteFill>
	);
};

export default ExplodingBird;
