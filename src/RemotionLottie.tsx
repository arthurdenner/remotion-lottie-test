import {CSSProperties, useEffect, useRef, useState} from 'react';
import lottie, {AnimationItem} from 'lottie-web';
import {continueRender, delayRender, useCurrentFrame} from 'remotion';

const getNextFrame = (
	currentFrame: number,
	totalFrames: number,
	loop?: boolean
) => {
	return loop
		? currentFrame % totalFrames
		: Math.min(currentFrame, totalFrames);
};

// Simple and limited interface to start with
interface RemotionLottieProps {
	animationData?: any;
	className?: string;
	loop?: boolean;
	path?: string;
	speed?: number;
	style?: CSSProperties;
}

const RemotionLottie = ({
	animationData,
	className,
	loop,
	path,
	speed = 1,
	style,
}: RemotionLottieProps) => {
	const animationRef = useRef<AnimationItem>();
	const lastFrameRef = useRef<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [handle] = useState(delayRender);
	const frame = useCurrentFrame();

	useEffect(() => {
		if (!containerRef.current) {
			return;
		}

		animationRef.current = lottie.loadAnimation({
			container: containerRef.current,
			autoplay: false,
			animationData,
			path,
		});

		if (lastFrameRef.current) {
			animationRef.current.goToAndStop(lastFrameRef.current, true);
		}

		const {current: animation} = animationRef;
		const onComplete = () => {
			continueRender(handle);
		};

		animation.addEventListener('DOMLoaded', onComplete);

		return () => {
			lastFrameRef.current = animation.currentFrame;
			animation.removeEventListener('DOMLoaded', onComplete);
			animation.destroy();
		};
	}, [animationData, handle, path]);

	useEffect(() => {
		if (!animationRef.current) {
			return;
		}

		animationRef.current.setSpeed(speed);
	}, [speed]);

	useEffect(() => {
		if (!animationRef.current) {
			return;
		}

		const {totalFrames} = animationRef.current;
		const expectedFrame = frame * speed;
		const nextFrame = getNextFrame(expectedFrame, totalFrames, loop);

		animationRef.current.goToAndStop(nextFrame, true);
	}, [frame, loop, speed]);

	return <div ref={containerRef} className={className} style={style} />;
};

export default RemotionLottie;
