import {
	AfterContentInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ContentChildren,
	EventEmitter,
	Input,
	Output,
	QueryList,
	ViewEncapsulation
} from '@angular/core';
import {Objects} from '@ng-dot/core';
import {TabAllDirective} from './tab-all.directive';
import {TabComponent} from './tab.component';

@Component({
	selector: 'dot-tabs',
	template: `
		<ng-container *ngIf="_init">
			<ng-template #list>
				<dot-area class="dot-tab-list-area" *ngIf="displayLink">
					<ul class="dot-tab-list" [dotGrid]="listGrid" [gridGap]="listGap">
						<li *ngIf="all"
							class="dot-tab-item"
							(click)="selectAll()">
							<a dot-tab-link
							   class="dot-tab-item_all"
							   [active]="_selectedAll"
							   [innerHTML]="_tabAll?.headline || all"
							></a>
						</li>
						<li *ngFor="let tab of _tabs;"
							class="dot-tab-item"
							(click)="select(tab)"
						>
							<a dot-tab-link [tab]="tab"></a>
						</li>
					</ul>
				</dot-area>
			</ng-template>

			<ng-container *ngIf="listPosition !== 'bottom'">
				<ng-container *ngTemplateOutlet="list"></ng-container>
			</ng-container>

			<section class="dot-tab-mains">
				<ng-container *ngFor="let tab of _tabs">
					<section class="dot-tab-main" *ngIf="tab._display">
						<ng-container [cdkPortalOutlet]="tab._content"></ng-container>
					</section>
				</ng-container>
			</section>

			<ng-container *ngIf="listPosition !== 'top'">
				<ng-container *ngTemplateOutlet="list"></ng-container>
			</ng-container>
		</ng-container>
	`,
	styleUrls: ['./tabs.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-tabs _with-script',
		'[class._selected]': '_selectedAll || _selected',
		'[class._unselected]': '!_selected',
		'[class._headline]': 'headline'
	}
})
export class TabsComponent implements AfterContentInit {
	/**
	 * display index of tab
	 */
	@Input() index: null | false | 'all' | 'rand' | number = 0;

	/**
	 * multiple select condition
	 */
	@Input() multiple: boolean;

	/**
	 * unselect condition
	 */
	@Input() unselectable: boolean;

	@Input() headline = false;
	/**
	 * using all tab condition
	 */
	@Input() all: string;

	/**
	 * limit condition of horizontal display
	 */
	@Input() listMax = 6;

	/**
	 * full width of horizontal display
	 */
	@Input() listFull: boolean;

	/**
	 * link gap
	 */
	@Input() listGap: number;

	@Input() listPosition: 'top' | 'bottom' | 'both' = 'top';

	@Output() changed$ = new EventEmitter;


	@ContentChildren(TabComponent) protected _tabComponents: QueryList<TabComponent>;
	
	protected _selected: TabComponent;

	protected _thisUpdate = this._update.bind(this);
	protected _autoUnselectable: boolean;
	_init: boolean;

	_tabs: TabComponent[] = [];
	_selectedAll: boolean;
	
	@ContentChild(TabAllDirective, {static: true}) _tabAll: TabAllDirective;

	get displayLink() {
		return this._tabs.length > 1;
	}

	get listGrid() {
		const count = this._tabs.length + (this.all ? 1 : 0);
		if (this.listFull && count < this.listMax) {
			return count;
		}
		return this.listGap ? this.listMax : false;
	}

	constructor(
		protected changeDetectorRef: ChangeDetectorRef,
	) {

	}

	ngAfterContentInit(): void {
		this._update(this._tabComponents.toArray());
		this._tabComponents.changes.subscribe(this._thisUpdate);

		this._init = true;
	}

	protected _update(tabs: TabComponent[]);
	protected _update(tabs) {

		const {index, changeDetectorRef} = this;

		this._tabs = tabs;

		const count = tabs.length;

		this._autoUnselectable = (Objects.isFalseLike(index) && index !== 0);


		if (
			!count
			|| Objects.isEmpty(index)
			|| this._autoUnselectable
		) {
			return changeDetectorRef.markForCheck();
		}

		if (this.all) {
			return this.selectAll();
		}

		switch (index) {
			case 'rand':
				break;
			default:
				if (count > index) {
					return this.select(tabs[index as number]);
				} else {
					return this.select(tabs[0]);
				}
		}
	}

	select(tab: TabComponent);
	select(tab) {
		const {changeDetectorRef, unselectable} = this;
		if (!this._selectedAll && this._selected === tab) {
			if (unselectable || (Objects.isEmpty(unselectable) && this._autoUnselectable)) {
				this._selected.selected$.emit(false);
				this._selected._display = false;
				this._selected = null;
				changeDetectorRef.markForCheck();
			}
			return;
		}

		this._selected = tab;
		this._tabs.forEach(displayFalse);
		tab._display = true;
		this._selectedAll = false;

		tab.selected$.emit(true);
		this.changed$.emit(this._selected);

		changeDetectorRef.markForCheck();

	}

	selectAll() {
		this._tabs.forEach(displayTrue);
		this._selectedAll = true;
		this.changeDetectorRef.markForCheck();
	}
}

function displayTrue(tab: TabComponent);
function displayTrue(tab) {
	tab._display = true;
}

function displayFalse(tab: TabComponent);
function displayFalse(tab) {
	tab._display = false;
}
