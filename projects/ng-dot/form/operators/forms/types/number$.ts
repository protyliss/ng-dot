import {FormTypeOperatorFunction} from '@ng-dot/form';

export function number$(name: string): FormTypeOperatorFunction<'number'> {
	return form => {
		return form.append('number', name);
	};
}