import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="date"> to FormScript
 * @param name
 */
export function date$(name: string): FormTypeOperatorFunction<'date'> {
	return form => {
		return form.append('date', name);
	};
}