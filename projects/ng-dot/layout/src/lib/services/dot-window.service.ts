import {Injectable} from '@angular/core';

export interface WindowOption {
	target: any;
	width?: number | string;
	height?: number | string;
	top?: number | string;
	left?: number | string;
	resize?: boolean;
	scroll?: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class DotWindowService {
	protected _assignOption(option: WindowOption) {
		return {
			resize: true,
			scroll: true,
			...option
		};
	}

	center(url: string, option: WindowOption) {
		// tslint:disable-next-line:prefer-const
		let {target, width, height, top, left, resize, scroll} = this._assignOption(option);

		const {width: fullWidth, height: fullHeight} = screen;

		width = getRelatedValue(fullWidth, width);
		height = getRelatedValue(fullHeight, height);

		left = window.screenX + (fullWidth - width) / 2;
		top = window.screenY + (fullHeight - height) / 2;

		return window.open(url, target || '', [
			`width=${width}`,
			`height=${height}`,
			`top=${top}`,
			`left=${left}`,
			`resizable=${resize}`,
			`scrollbars=${scroll}`
		].join(','));
	}
}

function getRelatedValue(full: number, value: string | number): number {
	if (typeof value === 'string') {
		if (value.endsWith('%')) {
			return full * (parseFloat(value) / 100);
		}
	}
	return value as number;
}