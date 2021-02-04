/**
 * get new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 * @param items
 */
export function arrayFlat(items: any[]);
export function arrayFlat(items) {
	return flat(items);
}

let flat = function (items: any[]) {
	const origin = Array.prototype['flat'];
	return (flat = origin ?
			function (_items) {
				return origin.call(_items);
			} :
			function (_items) {
				return _items.reduce(reducer, []);
			}
	).apply(this, arguments);

	function reducer(flatted, item) {
		if (Array.isArray(item)) {
			return flatted.concat(...flat(item));
		}
		flatted.push(item);
		return flatted;
	}
};