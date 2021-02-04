import {RegExps} from '../../extends/reg-exps';

export function toBoolean(target: any) {
	switch (typeof target) {
		case 'boolean':
			return target;
		case 'string':
			return RegExps.TRUE_LIKE.test(target as string);
		case 'number':
			return target > 0;
	}
	
	return false;
}