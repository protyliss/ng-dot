import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="week"> to FormScript
 * @param name
 */
export function week$(name: string): FormTypeOperatorFunction<'week'> {
	return form => {
		return form.append('week', name);
	};
}