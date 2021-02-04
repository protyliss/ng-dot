const _tag = /<\/?[a-z][a-z\-]*>/g;

export function stripTag(html: string) {
	return html.replace(_tag, '');
}