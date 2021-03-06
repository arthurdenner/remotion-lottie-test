import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Halloween-Balloons"
				lazyComponent={() => import('./Halloween/Balloons')}
				durationInFrames={90}
				fps={30}
				height={1080}
				width={1080}
			/>
			<Composition
				id="Halloween-Pumpkin"
				lazyComponent={() => import('./Halloween/Pumpkin')}
				durationInFrames={150}
				fps={30}
				height={1200}
				width={1600}
			/>
			<Composition
				id="Cybertruck"
				lazyComponent={() => import('./Cybertruck')}
				durationInFrames={500}
				fps={30}
				height={850}
				width={850}
			/>
			<Composition
				id="ExplodingBird"
				lazyComponent={() => import('./ExplodingBird')}
				durationInFrames={300}
				fps={30}
				height={850}
				width={850}
			/>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				height={1080}
				width={1920}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
		</>
	);
};
