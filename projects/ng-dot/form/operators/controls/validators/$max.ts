import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set form control [max], and [maxlength] if control type is 'number'
 * @param value
 */
export function $max(value: number): FormControlOperatorFunction {
	return control => {
		control.max = value;
		return control;
	};
}