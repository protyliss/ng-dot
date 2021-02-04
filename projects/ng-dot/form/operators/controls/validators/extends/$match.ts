import {AbstractControl} from '@angular/forms';
import {FormControlInterface, FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control Value Matching Validator
 * @param target
 */
export function $match(target: FormControlInterface): FormControlOperatorFunction {
	return control => {
		return control.setValidator(
			'match',
			(abstractControl: AbstractControl) => {
				// todo: FormControl.value is not equal to AbstractControl
				if (target.value && abstractControl.value) {
					if (target.value !== abstractControl.value) {
						return {
							match: target.label
						};
					}
				}
				return null;
			}
		);
	};
}