import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="search"> to FormScript
 * @param name
 */
export function search$(name: string): FormTypeOperatorFunction<'search'> {
	return form => {
		return form.append('search', name);
	};
}