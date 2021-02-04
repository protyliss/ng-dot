import {FormControlAutocomplete, FormControlOperatorFunction} from '@ng-dot/form';

export function $autocomplete(type: FormControlAutocomplete): FormControlOperatorFunction{
	return control => {
		control.autocomplete = type;
		return control;
	};
}