const CASE_GLUE = /([-_]|\s+)/;
const LINKED_UPPERCASE = /((?!\s)([A-Z]))/g;

export function capitalize(value: string) {
	return value
		.replace(LINKED_UPPERCASE, '$1 $2')
		.split(CASE_GLUE)
		.map(transformFunction)
		.join(' ');
}

export function transformFunction(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}