import {AbstractControl} from '@angular/forms';
import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control JSON validator
 */
export function $json(): FormControlOperatorFunction {
	return control => {
		return control.setValidator(
			'match',
			(abstractControl: AbstractControl) => {
				const {value} = abstractControl;
				if (value) {
					try {
						JSON.parse(value);
					} catch (reason) {
						return {json: true};
					}
				}
				return null;
			}
		);
	};
}