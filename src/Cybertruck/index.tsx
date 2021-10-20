import {AbsoluteFill, useVideoConfig} from 'remotion';
import {} from 'remotion';
import RemotionLottie from '../RemotionLottie';

const LottieCybertruck = () => {
	const {height, width} = useVideoConfig();

	return (
		<AbsoluteFill style={{height, width}}>
			<RemotionLottie
				path="https://assets4.lottiefiles.com/packages/lf20_RqpTFh.json"
				style={{height, width}}
			/>
		</AbsoluteFill>
	);
};

export default LottieCybertruck;
