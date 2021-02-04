import {
	AfterContentInit,
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
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {Constructor, extract, MixinComponent, StyleServiceBase} from '@ng-dot/core';

@Component({
	template: ``,
	styleUrls: [
		'./grid.scss'
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridStyleComponent {
}

@Injectable()
export class GridStyleService extends StyleServiceBase {
	constructor(injector: Injector) {
		super(injector, GridStyleComponent);
	}
}

type LayoutWidthKey =
	| 42
	| 48
	| 54
	| 64
	| 76
	| 10
	| 12
	| 14
	| 16
	| 18;

type LayoutWidthMap<T = number> = {
	[KEY in LayoutWidthKey]: T;
};

const LAYOUT_WIDTH_KEYS: LayoutWidthKey[] = [
	42,
	48,
	54,
	64,
	76,
	10,
	12,
	14,
	16,
	18
];

export function withGrid<T extends Constructor<MixinComponent>>(BaseClass: T) {
	@Directive()
		// @ts-ignore
	class MixedGrid extends BaseClass implements OnInit, OnChanges, AfterContentInit {
		_gridNode: HTMLElement;
		_gridInit;
		_gridClassList: string[];

		@Input() grid: number;

		@Input() gridGap: number;

		@Input() gridAt42: number;

		@Input() gridAt48: number;

		@Input() gridAt54: number;

		@Input() gridAt64: number;

		@Input() gridAt76: number;

		@Input() gridAt10: number;

		@Input() gridAt12: number;

		@Input() gridAt14: number;

		@Input() gridAt16: number;

		@Input() gridAt18: number;

		@Input() gridEnable = true;

		@Input() gridAt: Partial<LayoutWidthMap>;

		@ViewChild('gridNode', {static: false}) _gridNodeRef: ElementRef<HTMLElement>;


		constructor(injector: Injector) {
			super(injector);
		}

		ngOnInit() {
			super.ngOnInit();
			this._injector.get(GridStyleService);
		}

		ngAfterContentInit() {
			const {_mixedNode, _gridNodeRef} = this;

			this._gridNode = _gridNodeRef ?
				_gridNodeRef.nativeElement :
				_mixedNode;

			this._gridSetClass();
			this._gridInit = true;
		}

		ngOnChanges(changes: SimpleChanges) {
			super.ngOnChanges(changes);

			const extracted = extract(changes, [
				'grid',
				'gridGap',
				'gridAt42',
				'gridAt48',
				'gridAt54',
				'gridAt64',
				'gridAt76',
				'gridAt10',
				'gridAt12',
				'gridAt14',
				'gridAt16',
				'gridAt18',
				'gridEnable'
			]);

			Object.keys(extracted).forEach(key => {
				const change = extracted[key];
				const value = change.currentValue;
				this[key] = value;
				if (this._gridInit) {
					this._gridSetClass();
				}
			});
		}

		_gridSetClass() {
			const {_gridClassList, _gridNode} = this;

			if (_gridClassList) {
				_gridNode.classList.remove(..._gridClassList);
			}

			if (!this.gridEnable) {
				return;
			}

			const {grid, gridGap} = this;

			const classList = [];

			if (grid) {
				classList.push('dot-grid-' + grid);
			}

			if (gridGap || gridGap === 0) {
				classList.push('_gap-' + gridGap);
			}

			let current = LAYOUT_WIDTH_KEYS.length;

			while (current-- > 0) {
				const width = LAYOUT_WIDTH_KEYS[current];
				const mediaGrid = this['gridAt' + width];
				if (mediaGrid) {
					classList.push(`dot-grid-${mediaGrid}-at-${width}`);
				}
			}

			this._gridClassList = classList;
			_gridNode.classList.add(...classList);
		}
	}

	return MixedGrid;
}