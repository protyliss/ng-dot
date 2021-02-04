const _url = /(?:(?:([\w]+):\/\/)?(?:([^:/]+)(?::(\d+))?))?(\/[^?#]*)(?:\?([^#]+))?(?:#(.+))?/;

interface ParsedUrl {
	protocol: string;
	domain: string;
	host: string;
	port: string;
	path: string;
	query: string;
	hash: string;
}

export function parseUrl(url: string): ParsedUrl;
export function parseUrl(url) {
	if (!url) {
		return null;
	}
	
	const matched = url.match(_url);

	if (!matched) {
		return {
			domain: null,
			protocol: location.protocol,
			host: location.hostname,
			port: location.port,
			path: url,
			query: location.search
		};
	}
	const protocol = matched[1];
	const host = matched[2];
	const port = matched[3];
	const domain = host ?
		port ?
			host + ':' + port :
			host :
		'';
	return {
		domain,
		protocol,
		host,
		port,
		path: matched[4],
		query: matched[5],
		hash: matched[6]
	};
}
