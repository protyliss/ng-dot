import {ComponentKeyHas, Constructor} from '@ng-dot/core';
import {FormTypeOperatorFunction} from '@ng-dot/form';

export function component$<T extends Constructor,
	V = T extends Constructor<infer U> ?
		U :
		any>(name, component: T, inputs?: ComponentKeyHas<V>): FormTypeOperatorFunction<'custom'> {
	return form => {
		const control = form.append('custom', name);
		control['component'] = component;
		control['componentInputs'] = inputs;
		return control;
	};
}