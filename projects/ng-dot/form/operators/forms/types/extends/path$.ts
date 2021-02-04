import {FormTypeOperatorFunction} from '@ng-dot/form';
import {text$} from '../text$';
import {$pattern} from '../../../controls/validators/$pattern';

const _PATH = /^(\/[\w-_]+(\.[\w-_]+)*)+$/;

/**
 * Append <input type="text"> for `path` to FormScript
 * @param name
 */
export function path$(name: string): FormTypeOperatorFunction<'text'> {
	return form => {
		return form.pipe(
			text$(name),
			$pattern(_PATH)
		);
	};
}