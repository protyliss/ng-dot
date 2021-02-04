import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="tel"> to FormScript
 * @param name
 */
export function tel$(name: string): FormTypeOperatorFunction<'tel'> {
	return form => {
		return form.append('tel', name);
	};
}