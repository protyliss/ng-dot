export function getCookie(name) {
	const matched = document.cookie.match(new RegExp(`${name}=([^;]+)`));
	return matched ?
		matched[1] :
		null;
}