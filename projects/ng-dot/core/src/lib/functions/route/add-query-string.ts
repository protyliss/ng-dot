const _STARTS_WITH_MARK = /^[?&]/;

export function addQueryString(url: string, queryString: string) {
	const [path, hash] = url.split('#');

	if (_STARTS_WITH_MARK.test(queryString)) {
		queryString = queryString.slice(1);
	}

	return path
		+ encodeURIComponent(
			queryString ?
				(
					path.indexOf('?') > -1 ?
						'&' :
						'?'
				)
				+ queryString :
				''
		)
		+ (hash ? '#' + hash : '');
}