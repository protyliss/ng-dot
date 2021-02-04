import {FormTypeOperatorFunction} from '@ng-dot/form';
import {text$} from '../text$';
import {$pattern} from '../../../controls/validators/$pattern';

const _ID = /^[a-z][a-z0-9_\-]*$/;

/**
 * Append <input type="text"> for `String ID` to FormScript
 * @param name
 */
export function id$(name: string): FormTypeOperatorFunction<'text'> {
	return form => {
		return form.pipe(
			text$(name),
			$pattern(_ID)
		);
	};
}