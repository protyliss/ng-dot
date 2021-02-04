import {FormControlOperatorFunction} from '@ng-dot/form';

export function $abstract(flag = true): FormControlOperatorFunction {
	return control => {
		control.abstract = flag;
		return control;
	};
}

$abstract['true'] = $abstract(true);
$abstract['false'] = $abstract(false);