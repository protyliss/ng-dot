import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <select> to FormScript
 * @param name
 */
export function select$(name: string): FormTypeOperatorFunction<'select'> {
	return form => {
		return form.append('select', name);
	};
}