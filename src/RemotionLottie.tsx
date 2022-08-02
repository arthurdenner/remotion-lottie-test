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
	/**
	 * JSON object with the animation data.
	 * */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	animationData?: Record<any, any>;
	/**
	 * CSS classes to apply on the container of the animation.
	 */
	className?: string;
	/**
	 * If the animation should loop after its end.
	 */
	loop?: boolean;
	/**
	 * The speed of the animation. Defaults to 1.
	 */
	speed?: number;
	/**
	 * CSS properties to apply on the container of the animation.
	 */
	style?: CSSProperties;
}

const RemotionLottie = ({
	animationData,
	className,
	loop,
	speed = 1,
	style,
}: RemotionLottieProps) => {
	if (typeof animationData !== 'object') {
		throw new Error(
			'animationData should be provided as an object. If you only have the path to the JSON file, load it and pass it as animationData. See https://remotion.dev/link-tbd for more information.'
		);
	}

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
	}, [animationData, handle]);

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
