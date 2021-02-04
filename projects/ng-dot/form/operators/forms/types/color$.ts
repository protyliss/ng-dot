import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="color"> to FormScript
 * @param name
 */
export function color$(name: string): FormTypeOperatorFunction<'color'> {
	return form => {
		return form.append('color', name);
	};
}