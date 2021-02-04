export function setCookie(name: string, value: number | string, path?: string);
export function setCookie(name, value, path = '/') {
	document.cookie = `${name}=${value}; path=${path}`;
}