import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="datetime-local"> to FormScript
 * @param name
 */
export function datetimeLocal$(name: string): FormTypeOperatorFunction<'datetime-local'> {
	return form => {
		return form.append('datetime-local', name);
	};
}