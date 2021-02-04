import {FormTypeOperatorFunction} from '@ng-dot/form';
import {$pattern} from '../../../controls/validators/$pattern';
import {text$} from '../text$';

const _hex = /^([0-9a-fA-F]{2})*$/;

export function hex$(name: string): FormTypeOperatorFunction<'text'> {
	return form => {
		return form
			.pipe(
				text$(name),
				$pattern(_hex)
			);
	};
}