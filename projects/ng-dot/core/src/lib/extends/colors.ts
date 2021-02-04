export class Colors {
	_colors: string[];

	static by(...colors: [string[]] | string[]);
	static by(...colors) {
		return new Colors(...colors);
	}

	constructor(...colors: [string[]] | string[]);
	constructor(...colors) {
		this._colors = Array.isArray(colors[0]) ?
			colors[0] :
			colors;
	}

	getByValue(value: number, min: number, max?);
	getByValue(value, min, max) {

		value = Number(value);

		const {_colors} = this;

		if (!value) {
			return _colors[0];
		}

		if (!max) {
			max = min;
			min = 0;
		}

		const percent = Math.abs(value) / (max - min);


		const index = percent > 1 ?
			_colors.length - 1 :
			Math.round((_colors.length - 1) * percent);

		return _colors[index];
	}
}