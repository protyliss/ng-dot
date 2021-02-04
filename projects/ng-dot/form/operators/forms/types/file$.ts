import {FormTypeOperatorFunction} from '@ng-dot/form';

/**
 * Append <input type="file"> to FormScript
 * @param name
 */
export function file$(name: string): FormTypeOperatorFunction<'file'> {
	return form => {
		return form.append('file', name);
	};
}