import {FormTypeOperatorFunction} from '@ng-dot/form';

export function month$(name: string): FormTypeOperatorFunction<'month'> {
	return form => {
		return form.append('month', name);
	};
}