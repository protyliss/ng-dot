import {casting} from '../functions/strings/casting';

export interface FromSessionOption {
	name: string;
	defaults: any;
	useLocation: boolean;
}

export type FromSessionOptionLike = boolean | number | string | FromSessionOption;

/**
 * Value Access with Session Storage
 * @description
 *   Caution! Using With @Input, It occurred Infinite Loop
 * @param option
 */
export function FromSession(option: Partial<FromSessionOptionLike> = {}): any {
	if (option !== undefined && typeof option !== 'object') {
		option = {
			defaults: option
		};
	}
	
	

	return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
		let key = getStorageKey(target, propertyKey, option);
		
		const storeValue = sessionStorage.getItem(key);

		if (storeValue === null && option.hasOwnProperty('defaults')) {
			sessionStorage.setItem(key, option['defaults']);
		}

		return {
			set(value) {
				key = getStorageKey(target, propertyKey, option);
				if (value === null || value === undefined) {
					sessionStorage.removeItem(key);
				} else {
					sessionStorage.setItem(key, value);
				}
			},
			get() {
				key = getStorageKey(target, propertyKey, option);
				const value = sessionStorage.getItem(key);
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