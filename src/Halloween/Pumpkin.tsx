import React from 'react';
import {
	AbsoluteFill,
	Sequence,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import HeaderAndCredits from './HeaderAndCredits';
import RemotionLottie from '../RemotionLottie';
import './common.css';

const Pumpkin = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const animationDelay = 1;
	const animationInput = frame - animationDelay;
	const animationOpacity = interpolate(
		animationInput,
		[0, 5, durationInFrames - 20, durationInFrames],
		[0, 1, 1, 0]
	);

	return (
		<AbsoluteFill style={{opacity: animationOpacity}}>
			<RemotionLottie
				// https://lottiefiles.com/37789-scary-halloween-pumpkin
				path="https://assets4.lottiefiles.com/packages/lf20_c5izbrx1.json"
			/>
		</AbsoluteFill>
	);
};

const LottiePumpkin: React.FC = () => {
	const {durationInFrames, height, width} = useVideoConfig();

	return (
		<div className="container" style={{height, width}}>
			<Sequence from={0} durationInFrames={durationInFrames}>
				<Pumpkin />
			</Sequence>
			<Sequence from={30}>
				<HeaderAndCredits author="Roman Serebryakov" />
			</Sequence>
		</div>
	);
};

export default LottiePumpkin;
