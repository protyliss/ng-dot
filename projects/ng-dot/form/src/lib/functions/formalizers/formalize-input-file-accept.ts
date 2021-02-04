import {arrayFlat} from '@ng-dot/core';

/**
 * formalize value for input[type=file][accept]
 * @param extension
 */
export function formalizeInputFileAccept(extension: string | string[]);
export function formalizeInputFileAccept(...extensions) {
	return arrayFlat(extensions)
		.join(',')
		.split(',')
		.map(mapper)
		.join(', ');
}

function mapper(extension) {
	extension = extension.trim().toLowerCase();

	switch (extension) {
		case 'image':
		case 'video':
		case 'audio':
			return extension + '/*';

		case 'gif':
		case 'png':
		case 'jpeg':
			return 'image/' + extension;
		case 'jpg':
			return 'image/jpeg';
	}

	if (extension.startsWith('.')) {
		return extension;
	}

	return '.' + extension;
}