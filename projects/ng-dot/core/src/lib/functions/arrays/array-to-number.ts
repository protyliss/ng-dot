/**
 * get new array as number
 * @param items
 */
export function arrayToNumber(items: any[]);
export function arrayToNumber(items) {
	return items.map(toNumberMapper);
}

export function toNumberMapper(item: any): number;
export function toNumberMapper(item) {
	return Number(item);
}