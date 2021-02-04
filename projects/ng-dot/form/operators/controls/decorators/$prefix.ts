import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Prefix as Display to Control Starts
 * @param value
 */
export function $prefix(value: string): FormControlOperatorFunction {
	return control => {
		control.prefix = value;
		return control;
	};
}