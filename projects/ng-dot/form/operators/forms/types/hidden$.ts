import {FormTypeOperatorFunction} from '@ng-dot/form';

export function hidden$(name): FormTypeOperatorFunction<'hidden'> {
	return form => {
		return form.append('hidden', name);
	};
}
