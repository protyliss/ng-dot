import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="url"> to FormScript
 * @param name
 */
export function url$(name: string): FormTypeOperatorFunction<'url'> {
	return form => {
		return form.append('url', name);
	};
}