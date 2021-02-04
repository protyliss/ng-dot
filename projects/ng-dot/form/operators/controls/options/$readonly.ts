import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control [readonly] with disable autofocus
 * @param flag
 */
export function $readonly(flag = true): FormControlOperatorFunction {
	return control => {
		control.readonly = flag;
		if (!flag && control.autofocus) {
			control.autofocus = false;
		}
		return control;
	};
}

$readonly['true'] = $readonly(true);
$readonly['false'] = $readonly(false);