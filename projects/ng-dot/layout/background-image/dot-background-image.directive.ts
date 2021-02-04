import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {isNumeric} from '@ng-dot/core';

@Directive({
	selector: '*[dotBackgroundImage]',
	host: {
		class: 'dot-image-as-field'
	}
})
export class DotBackgroundImageDirective implements OnInit {
	@Input('dotBackgroundImage') set fromSelector(src: string) {
		if (!src) {
			return;
		}
		this.src = src;
	}

	@Input() src: string;
	@Input() width: string | number;
	@Input() height: string | number;
	@Input() ratio: number = 0.53;

	protected _node: HTMLElement;

	constructor(elementRef: ElementRef) {
		this._node = elementRef.nativeElement;
	}

	ngOnInit() {
		this._render();
	}

	protected _render() {
		const {src} = this;
		if (!src) {
			return;
		}

		const {_node, width, height, ratio} = this;
		const {style} = _node;

		const image = new Image;

		image.onload = () => {
			const boxWidth = width || image.width;
			let boxHeight = height || image.height;
			if (ratio) {
				boxHeight = Number(boxWidth) * ratio;
			}

			style.width = withUnit(boxWidth);
			style.height = withUnit(boxHeight);

			style.backgroundImage = `url('${src}')`;
			style.backgroundRepeat = 'no-repeat';
			style.backgroundPosition = 'center';
			style.backgroundSize = 'cover';
		};

		image.src = src;
	}
}

function withUnit(value: string | number) {
	if (typeof value === 'string'
		&& !isNumeric(value)
		&& !value.endsWith('px')
	) {
		return value;
	}
	return value + 'px';
}