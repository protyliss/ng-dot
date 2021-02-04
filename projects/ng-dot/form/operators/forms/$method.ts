import {FormPropertyOperator} from '@ng-dot/form';

/**
 * set form[name]
 * @param method
 */
export function $method(method: string): FormPropertyOperator {
	return form => {
		form.method = method;
		return form;
	};
}