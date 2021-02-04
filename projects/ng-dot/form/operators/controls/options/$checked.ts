import {FormControlOperatorFunction} from '@ng-dot/form';

export function $checked(flag = true): FormControlOperatorFunction {
	return control => {
		control.checked = flag;
		return control;
	};
}

$checked['true'] = $checked(true);
$checked['false'] = $checked(false);