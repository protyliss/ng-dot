import {FormControlOperatorFunction} from '@ng-dot/form';

export function $autofocus(flag = true): FormControlOperatorFunction {
	return control => {
		control.autofocus = flag;
		return control;
	};
}

$autofocus['true'] = $autofocus(true);
$autofocus['false'] = $autofocus(false);