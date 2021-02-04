import {formalizeInputFileAccept, FormControlOperatorFunction} from '@ng-dot/form';

export function $accept(extensions: string | string[]): FormControlOperatorFunction {
	return control => {
		control['_accept'] = formalizeInputFileAccept(extensions);
		return control;
	};
}