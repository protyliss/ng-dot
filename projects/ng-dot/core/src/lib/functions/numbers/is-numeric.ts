import {RegExps}    from '../../extends/reg-exps';

export function isNumeric(value: string | number) {
	return typeof value === 'number' || RegExps.NUMERIC.test(value);
}