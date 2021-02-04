import {casting} from '../functions/strings/casting';

export interface FromLocalOption {
	name: string;
	defaults: any;
	useLocation: boolean;
}

export type FromLocalOptionLike = boolean | number | string | FromLocalOption;

/**
 * Value Access with Local Storage
 * @description
 *   Caution! Using With @Input, It occurred Infinite Loop
 * @param option
 */
export function FromLocal(option: Partial<FromLocalOptionLike> = {}): any {
	if (option !== undefined && typeof option !== 'object') {
		option = {
			defaults: option
		};
	}

	return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
		let key = getStorageKey(target, propertyKey, option);
		
		const storeValue = localStorage.getItem(key);

		if (storeValue === null && option.hasOwnProperty('defaults')) {
			localStorage.setItem(key, option['defaults']);
		}

		return {
			set(value) {
				key = getStorageKey(target, propertyKey, option);
				if (value === null || value === undefined) {
					localStorage.removeItem(key);
				} else {
					localStorage.setItem(key, value);
				}
			},
			get() {
				key = getStorageKey(target, propertyKey, option);
				const value = localStorage.getItem(key);
				
				return casting(value);
			},
			enumerable: true,
			configurable: true
		};
	};
}

function getStorageKey(target, propertyKey, option) {
	let key = option['name'] || target.constructor.name + '_' + propertyKey;

	if (option['useLocation']) {
		key += location.pathname + location.search;
	}

	return key;
}