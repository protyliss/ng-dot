import {random} from '../random';

/**
 * get shuffled items
 * @param items
 */
export function arrayShuffle(items: any[]);
export function arrayShuffle(items) {
	const shuffled = [...items];
	const end = shuffled.length;
	const max = end - 1;
	let current = -1;
	let fromValue;
	let toIndex;
	while (++current < end) {
		toIndex = random(max);
		fromValue = shuffled[current];
		shuffled[current] = shuffled[toIndex];
		shuffled[toIndex] = fromValue;
	}
	return shuffled;
}