import {FormTypeOperatorFunction} from '@ng-dot/form';
import {text$} from '../text$';
import {$pattern} from '../../../controls/validators/$pattern';

const _SLUG = /^[_a-z][\w-]*$/;

/**
 * Append <input type="text"> for `slug` to FormScript
 * @param name
 */
export function slug$(name: string): FormTypeOperatorFunction<'text'> {
	return form => {
		return form.pipe(
			text$(name),
			$pattern(_SLUG)
		);
	};
}