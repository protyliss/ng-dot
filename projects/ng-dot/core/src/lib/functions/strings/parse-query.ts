export function parseQuery(target: string);
export function parseQuery(target) {
	const urlEnds = target.indexOf('?');
	return (urlEnds > -1 ?
			target.slice(urlEnds + 1) :
			target
	)
		.split('&')
		.reduce((result, item) => {
			const query = item.split('=');
			result[query[0]] = query[1];
			return result;
		}, {});
}