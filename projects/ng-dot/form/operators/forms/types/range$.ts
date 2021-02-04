import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="range"> to FormScript
 * @param name
 */
export function range$(name: string): FormTypeOperatorFunction<'range'> {
	return form => {
		return form.append('range', name);
	};
}