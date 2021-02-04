/**
 * formalize select options
 * @description
 *   [a] => [{text: a, value: a}],
 *   {a: b} => [{text: a, value: b}]
 * @param options
 */
import {FormSelectOption, FormSelectOptionsLike} from '../../interfaces/form-select';

export function formalizeSelectOption<T extends string | number>(options: FormSelectOptionsLike): FormSelectOption[];
export function formalizeSelectOption(options: FormSelectOptionsLike): FormSelectOption[];
export function formalizeSelectOption(options) {
	if (!options) {
		return [];
	}
	if (Array.isArray(options)) {
		if (typeof options[0] === 'object') {
			return options;
		}
		return options.map(optionMapFunction);
	}
	return Object.keys(options).reduce((_options, key) => {
		_options.push({
			text: options[key],
			value: key
		});
		return _options;
	}, []);
}

function optionMapFunction(option: string | number);
function optionMapFunction(option) {
	const type = typeof option;
	return type === 'string' || type === 'number' ?
		{
			text: option,
			value: option
		} :
		option;
}