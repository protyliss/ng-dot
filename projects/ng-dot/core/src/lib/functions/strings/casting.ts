import {isBooleanString} from '../booleans/is-boolean-string';
import {isNumeric} from '../numbers/is-numeric';

/**
 * Type Casting from String Value
 * @param value
 */
export function casting(value: string) {
	return isBooleanString(value) ?
		value.toLowerCase() === 'true' :
		isNumeric(value) ?
			Number(value) :
			value;
}