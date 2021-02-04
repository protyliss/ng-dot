import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {SelectorHold} from '@ng-dot/core';
import {DotTransType} from '@ng-dot/layout';
import {TransStyleService} from './trans-style.service';

@Directive({
	selector: '[dotTrans]',
})
export class TransDirective implements OnInit {
	@Input('dotTrans') set fromSelector(type: DotTransType) {
		if (type as any !== '') {
			this.transType = type;
		}
	}

	@Input() set transType(type: DotTransType) {
		this._type = type;
		if (this._init) {
			this.setClassList();
		}
	}

	protected _init: boolean;
	protected _type: DotTransType = 'fade';
	protected _node: Element;
	protected _typeClassName: SelectorHold;

	constructor(
		elementRef: ElementRef,
		style: TransStyleService
	) {
		this._node = elementRef.nativeElement;
	}

	ngOnInit(): void {
		this._init = true;

		this._typeClassName = new SelectorHold(this._node, {
			prefix: '__dot-'
		});

		if (this._type) {
			this.setClassList();
		}
	}

	protected setClassList() {
		const {_type, _typeClassName} = this;

		if (_type) {
			_typeClassName.set(_type);
		} else {
			_typeClassName.pop();
		}
	}
}
