import {FormTypeOperatorFunction} from '@ng-dot/form';
import {float$} from './float$';

/**
 * Append <input type="text"> for `longitude` to FormScript
 * @param name
 */
export function lng$(name: string): FormTypeOperatorFunction<'text'> {
	return form => {
		return form.pipe(
			float$(name)
		);
	};
}