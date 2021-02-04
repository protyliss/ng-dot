import {FormTypeOperatorFunction} from '@ng-dot/form';
import {float$} from './float$';

/**
 * Append <input type="text"> for `latitude` to FormScript
 * @param name
 */
export function lat$(name: string): FormTypeOperatorFunction<'text'>{
	return form => {
		return form.pipe(float$(name));
	};
}