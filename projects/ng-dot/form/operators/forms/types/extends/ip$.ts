import {FormTypeOperatorFunction} from '@ng-dot/form';
import {$assist} from '../../../controls/options/$assist';
import {$pattern} from '../../../controls/validators/$pattern';
import {text$} from '../../types/text$';

const _IP_V4 = /^localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

/**
 * Append <input type="text"> for `IPv4` to FormScript
 * @param name
 */
export function ip$(name: string): FormTypeOperatorFunction<'text'> {
	return form => {
		return form.pipe(
			text$(name),
			$pattern(_IP_V4),
			$assist('ip4')
		);
	};
}