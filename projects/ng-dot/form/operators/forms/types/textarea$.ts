import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <textarea> to FormScript
 * @param name
 */
export function textarea$(name: string): FormTypeOperatorFunction<'textarea'> {
	return form => {
		return form.append('textarea', name);
	};
}