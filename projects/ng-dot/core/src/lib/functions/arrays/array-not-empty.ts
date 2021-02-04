/**
 * get new array with not equals to null and undefined
 * @param items
 */
export function arrayNotEmpty(items: any[]): any[];
export function arrayNotEmpty(items) {
	return items ? 
		items.filter(filterer) :
		null;
}

function filterer(item) {
	return item !== null && item !== undefined;
}