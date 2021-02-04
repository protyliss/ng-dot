import {decodeQueryString} from './decode-query-string';

export function updateQuery(queryString: string, source?);
// tslint:disable-next-line:unified-signatures
export function updateQuery(queryArray: string[], source?);
// tslint:disable-next-line:unified-signatures
export function updateQuery(queryMap: Record<string, string | number>, source?);
export function updateQuery(string_or_array_or_map, source?) {
	if (!source) {
		source = decodeQueryString(location.search);
	}
	
	let configure = string_or_array_or_map;
	
	if (Array.isArray(configure)) {
		configure = configure.join('&');
	}

	if (typeof configure === 'string') {
		configure = decodeQueryString(configure);
	}

	const map = {...source};
	const names = Object.keys(configure);
	const end = names.length;
	let current = -1;
	while (++current < end) {
		let name = names[current];
		const value = configure[name];

		if (name.endsWith('?')) {
			name = name.substr(0, name.length - 1);
		}

		if ((value === null || value === undefined || value === '')) {
			if (map.hasOwnProperty(name)) {
				delete map[name];
			}
		} else {
			map[name] = value;
		}
	}

	return map;
}