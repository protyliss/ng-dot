/**
 * 
 * @param value
 * @param size
 */
export function zerofill(value: number | string, size: number = 2) {
	value = String(value);
	return size - value.length ?
		value.padStart(size, '0') :
		value;
}