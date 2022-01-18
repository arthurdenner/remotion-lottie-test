import React, {useEffect, useState} from 'react';
import {Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import HeaderAndCredits from './HeaderAndCredits';
import RemotionLottie from '../RemotionLottie';
import balloonsAnimation from './balloons.json';
import outro from './lf20_c5izbrx1.json';
import './common.css';

const Balloons = () => {
	const [data, setData] = useState(balloonsAnimation);
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 20, durationInFrames],
		[0, 1, 1, 0]
	);

	useEffect(() => {
		// @ts-expect-error testing
		setData(frame % 20 ? balloonsAnimation : outro);
	}, [frame]);

	return (
		<div style={{opacity, display: 'grid', alignContent: 'center', flex: 1}}>
			<RemotionLottie
				// https://lottiefiles.com/81293-horror-ballons
				animationData={data}
				speed={2}
				style={{height: 700}}
			/>
		</div>
	);
};

const LottieBalloons: React.FC = () => {
	const {height, width} = useVideoConfig();

	return (
		<div className="container" style={{height, width}}>
			<Sequence from={0}>
				<Balloons />
			</Sequence>
			<Sequence from={10}>
				<HeaderAndCredits author="Muhammad Yasir Ismail" />
			</Sequence>
		</div>
	);
};

export default LottieBalloons;
