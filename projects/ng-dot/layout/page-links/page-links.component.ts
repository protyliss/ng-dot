import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
	ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {arrayRange, decodeQueryString, parseUrl} from '@ng-dot/core';
import {DotRouteEventService, DotRoutePageService, DotRouteService} from '@ng-dot/route';
import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

interface PageLink {
	page: number;
	query: {
		page: number
	};
}

@Component({
	selector: 'dot-page-links',
	template: `
		<ng-container *ngIf="vars.init$ | async">
			<ul class="dot-page-links" dotTrans="ups">
				<li *ngIf="vars.first$ | async; let link" class="_first">
					<a routerLink="./" [queryParams]="link.query">{{link.page}}</a>
				</li>
				<li *ngIf="vars.prev$ | async; let link" class="_previous">
					<a routerLink="./" [queryParams]="link.query">{{link.page}}</a>
				</li>
				<ng-container *ngFor="let link of links;trackBy:usingTarget">
					<li>
						<a [routerLink]="path"
						   [queryParams]="link.query"
						   [class._active]="actives$[link.page] | async"
						>
							{{link.page}}
						</a>
					</li>
				</ng-container>
				<li *ngIf="vars.next$ | async; let link" class="_next">
					<a routerLink="./" [queryParams]="link.query">{{link.page}}</a>
				</li>
				<li *ngIf="vars.last$ | async; let link" class="_last">
					<a routerLink="./" [queryParams]="link.query">{{link.page}}</a>
				</li>
			</ul>
		</ng-container>
	`,
	styleUrls: [
		'./dot-page-links.scss'
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		DotRoutePageService
	]
})
export class PageLinksComponent implements OnInit, OnDestroy, OnChanges {


	@Input() set meta(meta) {
		this.total = meta['total'];
		this.page = meta['page'] || 1;
		this.limit = meta['limit'];
	}

	@Input() total: number;
	@Input() page = 1;
	@Input() limit = 24;
	@Input() blockLimit = 10;

	@Input() path = './';

	@Output() changed$ = new EventEmitter<number>();

	protected update$ = new Subject;
	protected lastActive$: BehaviorSubject<boolean>;
	protected init$ = new BehaviorSubject(false);

	protected firstPage$ = new BehaviorSubject<PageLink>(null);
	protected lastPage$ = new BehaviorSubject<PageLink>(null);
	protected prevBlock$ = new BehaviorSubject<PageLink>(null);
	protected nextBlock$ = new BehaviorSubject<PageLink>(null);

	actives$: Record<number, BehaviorSubject<boolean>> = {};
	links: PageLink[];
	vars = {
		init$: this.init$,
		first$: this.firstPage$,
		last$: this.lastPage$,
		prev$: this.prevBlock$,
		next$: this.nextBlock$
	};

	protected _init: boolean;
	protected _queries: Record<string, string | number>;
	protected _totalPage: number;
	protected _blockStart: number;
	protected _blockEnd: number;

	protected lastTotal: number;
	protected lastLimit: number;

	constructor(
		protected _changeDetectorRef: ChangeDetectorRef,
		protected _page: DotRoutePageService,
		protected _router: Router,
		protected _routeEvent: DotRouteEventService,
		protected _route: DotRouteService
	) {
		_page.with(this);

		this._page.subscription = this._routeEvent.ended$
			.subscribe(url => {
				this._updateQuery(url);
			});

		this._page.subscription = this.update$
			.pipe(debounceTime(240))
			.subscribe(() => {
				this._update();
			});
	}

	usingTarget(target, index) {
		return target;
	}

	ngOnInit(): void {
		this._init = true;
		this.init$.next(true);

		this._updateQuery(
			parseUrl(this._router.url).query
		);

		this._update();

		this._page.query$('page')
			.subscribe(page => {
				this.page = Number(page);
			});
	}

	ngOnDestroy(): void {
		this._page.destroy();
	}

	ngOnChanges(changes: SimpleChanges): void {
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			this[key] = change.currentValue;

			if (!this._init) {
				return;
			}

			switch (key) {
				case 'meta':
				case 'total':
				case 'page':
				case 'limit':
				case 'blockLimit':
					this.update$.next();
			}
		});
	}

	protected _updateQuery(url) {
		this._queries = decodeQueryString(url);
	}

	protected _update() {
		const {total, limit, blockLimit} = this;
		const page = Number(this.page);

		if (!total) {
			return null;
		}

		// same link
		if (
			this.lastTotal === total
			&& this.lastLimit === limit
			&& page >= this._blockStart
			&& page <= this._blockEnd
		) {
			return this.selectPage(page);
		}

		this.lastTotal = total;
		this.lastLimit = limit;

		const totalPage = Math.ceil(total / limit);

		const block = Math.ceil(page / blockLimit);
		const blockStart = ((block - 1) * blockLimit) + 1;
		let blockEnd = blockStart + blockLimit - 1;

		this._blockStart = blockStart;
		this._blockEnd = blockEnd;

		if (blockEnd > totalPage) {
			blockEnd = totalPage;
		}

		this.links = arrayRange(blockStart, blockEnd)
			.map(_page => {
				if (!this.actives$[_page]) {
					this.actives$[_page] = new BehaviorSubject(false);
				}


				return {
					page: _page,
					query: {
						...this._queries,
						page: _page,
					},
				};
			});

		// previous block page
		const prevBlock = blockStart - 1;
		this.prevBlock$.next(
			prevBlock - 1 > 1 ?
				{
					page: prevBlock,
					query: {
						...this._queries,
						page: prevBlock
					}
				} :
				null
		);

		// next block page
		const blockNext = blockEnd + 1;
		this.nextBlock$.next(
			blockNext < totalPage ?
				{
					page: blockNext,
					query: {
						...this._queries,
						page: blockNext
					}
				} :
				null
		);

		// first page
		this.firstPage$.next(
			blockStart !== 1 ?
				{
					page: 1,
					query: {
						...this._queries,
						page: 1
					}
				} :
				null
		);

		// last page
		this.lastPage$.next(
			blockEnd !== totalPage ?
				{
					page: totalPage,
					query: {
						...this._queries,
						page: totalPage
					}
				} :
				null
		);

		this.selectPage(page);

		this._changeDetectorRef.markForCheck();
	}

	selectPage(page) {
		const {lastActive$} = this;
		const active$ = this.actives$[page];

		if (!active$ || active$ === lastActive$) {
			return;
		}

		if (lastActive$) {
			lastActive$.next(false);
		}

		this.lastActive$ = active$;
		active$.next(true);

		this.changed$.emit(page);
		this.page = page;
	}
}
