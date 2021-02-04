import {catchConsoleError} from '@ng-dot/core';
import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control Attribute as Async
 * @param name
 * @param requester
 */
export function $asyncProperty(name: string, requester: string | Promise<any> | (() => string | Promise<any>)): FormControlOperatorFunction {
	return control => {
		if (requester instanceof Promise) {
			control
				.asyncLoad()
				.setProperty('disabled', true);

			requester
				.then((response) => {
					control
						.setProperty(name, response)
						.asyncLoaded();
				})
				.catch(catchConsoleError);

			return control;
		}

		if (typeof requester === 'function') {
			return control.setAsyncProperty(name, requester);
		}

		return control;
	};
}