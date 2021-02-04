const BOOLEAN_STRING = /^(true|false)$/i;

export function isBooleanString(value: string) {
	return BOOLEAN_STRING.test(value);
}