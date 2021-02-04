import {FormPropertyOperatorFunction} from '@ng-dot/form';

/**
 * set form[enctype]
 * @param flag
 */
export function $upload(flag = true): FormPropertyOperatorFunction {
	return form => {
		form.enctype = 'multipart/form-data';
		return form;
	};
}