import {encodeQueryString} from './encode-query-string';
import {updateQuery} from './update-query';

export function updateQueryString(queryString: string, source?);
// tslint:disable-next-line:unified-signatures
export function updateQueryString(queryArray: string[], source?);
// tslint:disable-next-line:unified-signatures
export function updateQueryString(queryMap: Record<string, string | number>, source?);
export function updateQueryString(string_or_array_or_map, source?) {
	return encodeQueryString(
		updateQuery.apply(this, arguments)
	);
}