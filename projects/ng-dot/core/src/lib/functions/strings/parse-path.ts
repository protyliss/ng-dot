export function parsePath(path: string, separator?: string): string[];
export function parsePath(path, separator = '/') {
	if (path.indexOf('|') < 0) {
		return [path];
	}

	const result = [];

	const slugs = path.split(separator);
	const end = slugs.length;
	let current = -1;

	let slug;
	let multiEnd;
	let multiPrefix;
	let multiSlugs;
	let multiCurrent;
	let multiSlug;

	while (++current < end) {
		slug = slugs[current];

		if (slug.indexOf('|') < 0) {
			continue;
		}

		multiPrefix = [...slugs];
		multiSlugs = slug.split('|');
		multiEnd = multiSlugs.length;
		multiCurrent = -1;

		while (++multiCurrent < multiEnd) {
			multiSlug = multiSlugs[multiCurrent];
			multiPrefix[current] = multiSlug;

			result.push(
				...parsePath(multiPrefix.join(separator))
			);
		}
		break;
	}

	return result;
}