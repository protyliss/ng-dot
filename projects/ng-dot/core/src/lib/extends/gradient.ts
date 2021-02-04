/**
 * Means Use as Color
 */
export type Color = string | [number, number, number, (number | string)?];

const _HEX_CODE = /^#?([a-fA-F0-9]{3,6})$/;
const _RGB_ARGS = /^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/;

export class Gradient {
	protected _beginArray: number[];
	protected _rRange: number;
	protected _gRange: number;
	protected _bRange: number;

	constructor(begin: Color, end: Color) {
		const beginArray = getColorArray(begin);
		const endArray = getColorArray(end);

		this._beginArray = beginArray;

		this._rRange = beginArray[0] - endArray[0];
		this._gRange = beginArray[1] - endArray[1];
		this._bRange = beginArray[2] - endArray[2];
	}

	protected _getRgbArray(step: number) {
		const {_beginArray} = this;
		step = step < 0 ?
			0 :
			step > 1 ?
				1 :
				step;

		const {round} = Math;
		return [
			_beginArray[0] + round(this._rRange * step),
			_beginArray[1] + round(this._gRange * step),
			_beginArray[2] + round(this._bRange * step),
		];
	}

	getRgb(step: number) {
		const [r, g, b] = this._getRgbArray(step);
		return `rgb(${r}, ${g}, ${b})`;
	}

	getRgba(step: number, alpha?: number) {
		const [r, g, b] = this._getRgbArray(step);

		const a = alpha === undefined ?
			step :
			1 < alpha ?
				alpha / 100 :
				alpha;

		return `rgba(${r}, ${g}, ${b}, ${a})`;
	}

	getHex(step: number) {
		const [r, g, b] = this._getRgbArray(step);
		return '#'
			+ r.toString(16)
			+ g.toString(16)
			+ b.toString(16);
	}
}

/**
 * @description
 *  - '#rgb'
 *  - '#rrggbb'
 *  - '#rrggbbaa'
 *  - 'r,g,b'
 *  - 'r,g,b,a'
 *  - [r, g, b]
 *  - [r, g, b, a]
 * @param color
 * @returns [number <=255 , number <=255 , number <=255 , number <= 1]
 */
function getColorArray(color: Color): [number, number, number, number] {
	if (typeof color === 'string') {
		if (color.startsWith('#')) {
			color = color.slice(1);
		}

		const hexCodes = color.match(_HEX_CODE);

		if (hexCodes) {
			const hexCode = hexCodes[1];
			switch (hexCode.length) {
				case 1:
				case 2:
					break;

				case 3:
					const r = hexCode.charAt(0);
					const g = hexCode.charAt(1);
					const b = hexCode.charAt(2);
					return [
						parseInt(r + r, 16),
						parseInt(g + g, 16),
						parseInt(b + b, 16),
						1
					];
				// 6 ~
				default:
					return [
						parseInt(hexCode.substr(0, 2), 16),
						parseInt(hexCode.substr(2, 2), 16),
						parseInt(hexCode.substr(4, 2), 16),
						hexCode.length > 6 ?
							parseInt(hexCode.substr(6, 2), 16) / 255 :
							1
					];
			}
		}

		const rgbArgs = color.match(_RGB_ARGS);

		if (rgbArgs) {
			const alphaString = rgbArgs[3];
			return [
				Number(rgbArgs[1]),
				Number(rgbArgs[2]),
				Number(rgbArgs[3]),
				alphaString ?
					percentToOne(alphaString) :
					1
			];
		}
	} else if (Array.isArray(color)) {
		const rgbArray = color.slice(0, 3);
		switch (color.length) {
			case 4:
				const alphaItem = color[3];
				rgbArray[3] = alphaItem ?
					percentToOne(alphaItem) :
					1;
				return rgbArray as [number, number, number, number];
			case 3:
				rgbArray[3] = 1;
				return rgbArray as [number, number, number, number];
		}
	}

	throw new RangeError('Not Supplied Color Format:' + color);
}

function percentToOne(value: string | number) {
	return typeof value === 'number' ?
		value :
		value.endsWith('%') ?
			Number(value.substr(0, value.length - 1)) / 100 :
			Number(value);
}

