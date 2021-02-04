import {FormControlAssistType, FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control Assist
 * @param type
 */
export function $assist(type: FormControlAssistType): FormControlOperatorFunction{
	return control => {
		control['assist'] = type;
		return control;
	};
}