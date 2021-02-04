import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="email"> to FormScript
 * @param name
 */
export function email$(name: string): FormTypeOperatorFunction<'email'> {
	return form => {
		return form.append('email', name);
	};
}