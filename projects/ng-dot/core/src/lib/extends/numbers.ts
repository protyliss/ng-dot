import {RegExps} from './reg-exps';

export class Numbers {
	static isNumber(value) {
		return typeof value === 'number' || RegExps.NUMBER.test(value);
	}

	static isNumeric(value) {
		return typeof value === 'number' || RegExps.NUMERIC.test(value);
	}

	static range(value: number, max: number);
	// tslint:disable-next-line:unified-signatures
	static range(value: number, min: number, max: number);
	static range(value, min, max?) {
		if (max === undefined) {
			max = min;
			min = 0;
		}
		
		return value < min ?
			min :
			value > max ?
				max :
				value;
	}
}
