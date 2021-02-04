import {FormTypeOperatorFunction} from '@ng-dot/form';
import {$min} from '../../../controls/validators/$min';
import {number$} from '../number$';

/**
 * Append <input type="number"> for Number ID to FormScript
 * @param name
 */
export function key$(name: string): FormTypeOperatorFunction<'number'> {
	return form => {
		return form.pipe(
			number$(name),
			$min(0)
		);
	};
}