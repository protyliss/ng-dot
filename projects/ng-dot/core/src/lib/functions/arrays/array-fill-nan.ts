/**
 * fill NaN to array
 * @param items
 */
export function arrayFillNan(items: any[]): number[];
export function arrayFillNan(items) {
	return items.map(arrayNanMapper);
}

export function arrayNanMapper(item) {
	return NaN;
}