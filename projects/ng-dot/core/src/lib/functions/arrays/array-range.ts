// tslint:disable-next-line:unified-signatures
/**
 * get array filled with numbers from min number to max number
 * @param min
 * @param max
 */
export function arrayRange(min: number, max: number): number[];
/**
 * get array filled with numbers from zero to max number
 * @param max
 */
export function arrayRange(max: number): number[];
/**
 * get array filled with numbers
 * @param min_or_max
 * @param max
 */
export function arrayRange(min_or_max, max?) {
	let min = 0;

	if (max) {
		min = min_or_max;
	}

	max++;

	const items = [];
	do {
		items.push(min);
	} while (++min < max);

	return items;
}