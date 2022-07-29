import {continueRender, delayRender} from 'remotion';
import {useEffect, useState} from 'react';

interface UseLottieParams {
	/**
	 * A JSON object with the animation data.
	 * Shouldn't be provided if `path` is passed.
	 * */
	animationData?: any;
	/**
	 * A path to an external JSON file.
	 * Shouldn't be provided if `animationData` is passed.
	 */
	path?: string;
}

export const useLottie = ({
	animationData: initialState,
	path,
}: UseLottieParams) => {
	if (typeof initialState === 'object' && typeof path === 'string') {
		throw new Error('Pass either the animationData or the path prop, not both');
	}

	const [animationData, setAnimationData] = useState(initialState);
	const [handle] = useState(delayRender);

	useEffect(() => {
		if (typeof path !== 'string') {
			return;
		}

		fetch(path)
			.then((res) => res.json())
			.then(setAnimationData);
	}, [path]);

	useEffect(() => {
		if (animationData) {
			continueRender(handle);
		}
	}, [animationData, handle]);

	return {animationData};
};
