import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="text"> to FormScript
 * @param name
 */
export function text$(name: string): FormTypeOperatorFunction<'text'> {
	return form => {
		return form.append('text', name);
	};
}