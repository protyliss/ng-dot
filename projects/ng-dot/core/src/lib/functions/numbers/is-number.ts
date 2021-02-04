import {RegExps} from '../../extends/reg-exps';

export function isNumber(value: string | number) {
	return typeof value === 'number' || RegExps.NUMBER.test(value);
}