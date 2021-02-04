/**
 * get each value as only one as unique from array
 * @param items
 */
export function arrayUnique(items: any[]): any[];
export function arrayUnique(items) {
	return items.filter(arrayUniqueFilterer);
}

export function arrayUniqueFilterer(item: any, index: number, items: any[]): boolean;
export function arrayUniqueFilterer(item, index, items) {
	return items.indexOf(item) === index;
}