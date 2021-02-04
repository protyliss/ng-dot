import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Injector,
	Input,
	OnChanges,
	SimpleChanges,
	ViewEncapsulation
} from '@angular/core';
import {SelectorHold, SelectorToggle} from '@ng-dot/core';
import {NavItem, NavType} from '@ng-dot/layout';
import {DotNavItemComponent} from './dot-nav-item.component';

@Component({
	selector: 'dot-nav, [dot-nav]',
	template: `
		<ng-container *ngIf="items; else displayContent">
			<ng-container *ngFor="let item of items">
				<dot-nav-item [item]="item"></dot-nav-item>
			</ng-container>
		</ng-container>
		<ng-template #displayContent>
			<ng-content></ng-content>
		</ng-template>
	`,
	styleUrls: ['./navs.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		role: 'list',
		'[id]': 'id'
	}
})
export class DotNavComponent implements AfterContentInit, OnChanges {
	@Input('dot-nav') set fromSelector(id: string) {
		this.id = id;
	}

	id: string;

	@Input() type: NavType = 'xy';

	@Input() onRight: boolean;
	@Input() toggleOnLeft: boolean;

	@Input() root: DotNavComponent;
	@Input() depth = 0;
	@Input() items: NavItem[];

	protected _typeClassName: SelectorHold<NavType>;
	protected _onRightClassName: SelectorToggle;
	protected _toggleOnLeftClassName: SelectorToggle;
	protected _depthClassName: SelectorHold;
	protected _node: HTMLElement;
	protected _isRoot: true;
	protected _init: boolean;

	protected _parentListItem: null;

	constructor(
		injector: Injector
	) {
		const elementRef = injector.get(ElementRef);

		let parentListItem;
		try {
			parentListItem = injector.get(DotNavItemComponent);
		} catch (reason) {
		}

		this._node = elementRef.nativeElement as any;
		this._parentListItem = parentListItem;
	}

	ngAfterContentInit(): void {
		const {_node, _parentListItem} = this;

		this._depthClassName = new SelectorHold(_node, {
			prefix: '_depth'
		});

		if (!this.root && !_parentListItem) {
			this.root = this;
			this._isRoot = true;

		}

		if (this._isRoot) {
			this._typeClassName = new SelectorHold(_node, {
				prefix: '_'
			});
			this._onRightClassName = new SelectorToggle(_node, '_on-right');
			this._toggleOnLeftClassName = new SelectorToggle(_node, '_toggle-on-left');
			_node.classList.add('dot-nav');
		}

		this._init = true;
		this._update();
	}

	ngOnChanges(changes: SimpleChanges): void {
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			this[key] = change.currentValue;
			if (!this._init) {
				return;
			}
			switch (key) {
				case 'type':
				case 'onRight':
				case 'toggleOnLeft':
					this._update();
			}
		});
	}

	protected _update() {

		this._depthClassName.set(this.depth as any);

		if (!this._isRoot) {
			return;
		}

		const {type} = this;
		this._typeClassName.set(type);
		this._onRightClassName.disable(!this.onRight);
		this._toggleOnLeftClassName.disable(!this.toggleOnLeft);
	}
}
