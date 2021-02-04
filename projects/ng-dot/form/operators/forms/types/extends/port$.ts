import {FormTypeOperatorFunction} from '@ng-dot/form';
import {number$} from '../number$';
import {$range} from '../../../controls/validators/$range';

/**
 * Append <input type="number"> for `port` to FormScript
 * @param name
 */
export function port$(name: string): FormTypeOperatorFunction<'number'> {
	return form => {
		return form
			.pipe(
				number$(name),
				$range(0, 65535)
			);

	};
}