import {$dataType} from '../../../controls/options/$data-type';
import {$options} from '../../../controls/options/$options';
import {select$} from '../select$';
import {FormTypeOperatorFunction} from '@ng-dot/form';

export function boolean$(name: string): FormTypeOperatorFunction<'text'> {
	return form => {
		return form.pipe(
			select$(name),
			$options({
				'true': 'True',
				'false': 'False'
			}),
			$dataType('boolean')
		);
	};
}