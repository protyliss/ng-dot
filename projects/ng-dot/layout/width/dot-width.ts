import {
	ChangeDetectionStrategy,
	Component,
	Directive,
	ElementRef,
	Injectable,
	Injector,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewEncapsulation
} from '@angular/core';
import {SelectorHold, StyleServiceBase} from '@ng-dot/core';

@Component({
	template: '',
	styleUrls: [
		'./dot-width.scss'
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidthStyleComponent {
}

@Injectable()
export class WidthStyleService extends StyleServiceBase {
	constructor(injector: Injector) {
		super(injector, WidthStyleComponent);
	}
}

export type DotWidthAlias =
	| 32
	| 42
	| 48
	| 54
	| 64
	| 76
	| 10
	| 12
	| 14
	| 16
	| 18
	| 20
	| 22
	| 24
	;

const MAP = {
	dotMaxs: 'maxs',
	dotMax: 'max',
	dotMins: 'mins',
	dotMin: 'min'
};

const ATTRIBUTES = Object.keys(MAP);

@Directive({
	selector: '[dotMaxs], [dotMax], [dotMins], [dotMin]'
})
export class DotWithDirective implements OnInit, OnChanges {

	@Input() dotMins: DotWidthAlias;
	@Input() dotMaxs: DotWidthAlias;
	@Input() dotMin: DotWidthAlias;
	@Input() dotMax: DotWidthAlias;

	protected _node: HTMLElement;
	protected classHolders: Record<string, SelectorHold> = {};

	constructor(elementRef: ElementRef) {
		this._node = elementRef.nativeElement;
	}

	protected _update() {
		const {classHolders} = this;
		ATTRIBUTES.forEach(key => {
			const value = this[key];
			const prefix = MAP[key];
			if (value) {
				if (!classHolders[prefix]) {
					classHolders[prefix] = new SelectorHold(this._node, {prefix: '_' + prefix});
				}
				classHolders[prefix].set(value);
			}
		});
	}

	ngOnInit(): void {
		this._update();
	}

	ngOnChanges(changes: SimpleChanges): void {
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			const value = change.currentValue;
			this[key] = value;

			switch (value) {
				case 'dotMins':
				case 'dotMin':
				case 'dotMaxs':
				case 'dotMax':
					this._update();
			}
		});
	}
}
