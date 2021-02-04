export function decodeQueryString(queryString: string) {
	if (!queryString) {
		return {};
	}

	const result = {};
	const end = queryString.length;
	let current = queryString.startsWith('?') ? 0 : -1;
	let char;
	let name = '';
	let value = '';
	let flag;
	while (++current < end) {
		char = queryString.charAt(current);

		if (flag) {
			if (char === '&') {
				result[name] = value;
				name = '';
				value = '';
				flag = false;

			} else {
				value += char;
			}
		} else {
			switch (char) {
				case '=':
					flag = true;
					break;

				case '&':
					result[name] = value;
					name = '';
					value = '';
					break;
				default:
					name += char;
			}
		}
	}

	result[name] = value;

	return result;
}