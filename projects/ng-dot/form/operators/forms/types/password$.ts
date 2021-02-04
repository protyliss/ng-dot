import {FormTypeOperatorFunction} from '@ng-dot/form';

export function password$(name: string): FormTypeOperatorFunction<'password'> {
	return form => {
		return form.append('password', name);
	};
}