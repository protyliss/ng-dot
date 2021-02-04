/**
 * Recursive Assign Object
 * @param target
 * @param source
 */
export function assign<T extends Object, U extends Object>(target: T, source: U): T & U {
	if (!source) {
		return target as T & U;
	}

	if (!target) {
		return source as T & U;
	}

	const result = {...target};

	const keys = Object.keys(source);
	let key;
	let current = keys.length;
	while (current-- > 0) {
		key = keys[current];

		const a = target[key];
		const b = source[key];

		if (a === undefined) {
			result[key] = b;
		} else {
			if (Array.isArray(a) && Array.isArray(b)) {
				let index = a.length;
				const arrayResult = [];
				while (index-- > 0) {
					arrayResult[index] = assign(a[index], b[index]);
				}
				result[key] = arrayResult;
				continue;
			}

			if (typeof a === 'object' && typeof b === 'object') {
				result[key] = assign(a, b);
			} else {
				result[key] = b;
			}
		}
	}

	return result as T & U;
}
