import {formalizeSelectOption, FormControlOperatorFunction, FormSelectOptionsLike} from '@ng-dot/form';

/**
 * Set <option>
 * @param options
 */
export function $options(options: FormSelectOptionsLike): FormControlOperatorFunction {
	return control => {
		control.options = formalizeSelectOption(options);
		return control;
	};
}