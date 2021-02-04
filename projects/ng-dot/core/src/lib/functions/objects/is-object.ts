export function isObject(target): target is object;
export function isObject(target) {
	return target && typeof target === 'object';
}