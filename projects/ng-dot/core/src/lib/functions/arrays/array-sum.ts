/**
 * get sum value from number array
 * @param items
 */
export function arraySum(items: number[]): number;
export function arraySum(items) {
	return items.reduce(reducer, 0);
}

function reducer(total: number, item: number): number;
function reducer(total, item) {
	total += item;
	return total;
}