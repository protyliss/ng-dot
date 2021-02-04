/**
 * Get Random Value
 * Item when it Array, or Character when It String
 * @param target
 */
export function random(target: any[] | string);
/**
 * get random value in range
 * @param min
 * @param max
 */
export function random(min: number, max?: number): number;
export function random(min_or_max_or_target, max?) {
	const target = min_or_max_or_target;

	if (Array.isArray(target)) {
		return target[random(target.length - 1)];
	}

	if (typeof target === 'string') {
		return target.charAt(random(0, target.length - 1));
	}

	let min = target;
	if (!max) {
		max = min;
		min = 0;
	}

	const stringMax = String(max);
	const point = stringMax.indexOf('.');
	const decimalSize = point > -1 ? stringMax.length - point : 0;

	if (decimalSize) {
		const byTen = 10 * decimalSize;
		min *= byTen;
		max *= byTen;
		return parseFloat(
			((Math.round(Math.random() * (max - min)) + min ) / byTen)
				.toFixed(decimalSize)
		);
	}

	return Math.round(Math.random() * (max - min)) + min;
}