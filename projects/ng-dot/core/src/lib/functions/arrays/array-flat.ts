/**
 * get new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 */
export function arrayFlat(items: any[]);
export function arrayFlat(items) {
	return flatFunction(items);
}

function flatFunction(items: any[]){
	const origin = Array.prototype['flat'];
	// @ts-ignore
	return (flatFunction = origin ?
		function(_items) {
			return origin.call(_items);
		} :
		function(_items){
			return _items.reduce(reducer, []);
		}
	).apply(this, arguments);

	function reducer(flatted, item) {
		if (Array.isArray(item)) {
			return flatted.concat(...flatFunction(item));
		}
		flatted.push(item);
		return flatted;
	}
}
