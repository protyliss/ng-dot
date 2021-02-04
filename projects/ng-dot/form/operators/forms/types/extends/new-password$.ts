import {FormTypeOperatorFunction} from '@ng-dot/form';
import {$autocomplete} from '../../../controls/options/$autocomplete';

/**
 * Append <input type="password" autocomplete="new-password"> to FormScript
 * @param name
 */
export function newPassword$(name: string): FormTypeOperatorFunction<'password'> {
	return form => {
		return form.append('password', name)
			.pipe(
				$autocomplete('new-password')
			);
	};
}