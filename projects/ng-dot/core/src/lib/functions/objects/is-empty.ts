export function isEmpty(target: string): target is '';
export function isEmpty(target: null): target is null;
export function isEmpty(target: undefined): target is undefined;
export function isEmpty(target: any): boolean;
export function isEmpty(target) {
	return target === undefined
		|| target === null
		|| (Array.isArray(target) && target.length === 0)
		|| (typeof target === 'string' && target.length === 0);
}