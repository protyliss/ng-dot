import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control <label [innerHTML]>
 * @param value
 */
export function $label(value: string): FormControlOperatorFunction {
	return control => {
		control.label = value;
		control.nameAsLabel = false;
		return control;
	};
}