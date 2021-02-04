import {FormTypeOperatorFunction} from '@ng-dot/form';

export function checkbox$(name: string): FormTypeOperatorFunction<'checkbox'> {
	return form => {
		return form.append('checkbox', name);
	};
}