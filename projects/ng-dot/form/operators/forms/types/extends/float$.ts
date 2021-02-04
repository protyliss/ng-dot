import {FormTypeOperatorFunction} from '@ng-dot/form';
import {$pattern} from '../../../controls/validators/$pattern';
import {text$} from '../text$';

const _FLOAT = /\d+\.\d+/;

/**
 * Append <input type="text"> for `float` to FormScript
 * @param name
 */
export function float$(name: string): FormTypeOperatorFunction<'text'>{
	return form => {
		return form.pipe(
			text$(name),
			$pattern(_FLOAT)
		);
	};
}