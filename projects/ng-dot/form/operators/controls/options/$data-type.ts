import {FormControlDataType, FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Data Type of Control Value 
 * @param value
 */
export function $dataType(value: FormControlDataType): FormControlOperatorFunction {
	return control => {
		control.dataType = value;
		return control;
	};
}