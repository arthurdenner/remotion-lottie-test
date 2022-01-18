#!/usr/bin/env zx
import {$} from 'zx';

const buildComposition = (id) =>
	$`remotion render src/index.tsx ${id} out/${id}.mp4`;

const compositions = ['Halloween-Balloons'];

await Promise.all(compositions.map(buildComposition));
