import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set form control [min], and [minlength] if control type is 'number'
 * @param value
 */
export function $min(value: number): FormControlOperatorFunction {
	return control => {
		control.min = value;
		return control;
	};
}