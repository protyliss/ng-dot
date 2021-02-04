import {isNumeric} from '../numbers/is-numeric';

export function getQueryValue(key: string): string | number;
// tslint:disable-next-line:unified-signatures
export function getQueryValue(queryString: string, key: string): string | number;
export function getQueryValue(queryString_or_key, key?) {
	let query;
	if (key) {
		query = queryString_or_key;
	} else {
		query = location.search;
		key = queryString_or_key;
	}

	const matched = query.match(new RegExp(`${key}=([^&#]+)`));

	if (matched) {
		const value = matched[1];
		return isNumeric(value) ?
			Number(value) :
			value;
	}
	return null;
}