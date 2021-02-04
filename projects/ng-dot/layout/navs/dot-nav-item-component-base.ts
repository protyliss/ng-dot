import {AfterViewInit, Directive, ElementRef, Injector, Input, OnChanges, SimpleChanges} from '@angular/core';
import {decodeQueryString, parseUrl, SelectorHold} from '@ng-dot/core';
import {BehaviorSubject} from 'rxjs';
import {NavItem} from '@ng-dot/layout';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DotNavItemComponentBase implements AfterViewInit, OnChanges {
	@Input() set link(link: string) {
		if (!link) {
			this._link = null;
			this.queryParams = null;
			return;
		}

		const url = parseUrl(link);
		if (url.query) {
			link = link.replace(/\?.+$/, '');
			this.queryParams = decodeQueryString(url.query);
		}
		this._link = link;
	}

	get link() {
		return this._link;
	}

	_link: string;

	@Input() iconGroup = 'icon';

	@Input() target: string;

	@Input() icon: string;

	@Input() item: NavItem;

	@Input() label: string;

	@Input() root: any;

	@Input() exact = false;

	get self(): any {
		return this.item;
	}

	get hasChild() {
		return this.children && this.children.length;
	}

	get children() {
		return this.self && this.self.children;
	}

	active: boolean;
	activeClass = '_active';

	icon$ = new BehaviorSubject(undefined);

	queryParams: Record<string, string | number>;

	protected _unfold = false;
	protected _navNode: HTMLElement;
	protected _subList: HTMLUListElement;
	private _unfoldClassName: SelectorHold<'unfold' | 'fold'>;


	constructor(
		injector: Injector
	) {
		const elementRef = injector.get(ElementRef);
		this._navNode = elementRef.nativeElement as any;
		
	}

	ngAfterViewInit(): void {
		this.icon$.next(this.icon);
		
		if (!this.hasChild) {
			return;
		}

		const subList = this._navNode.querySelector('ul');
		if (!subList) {
			console.info('Cannot found Sub List, But Item has children!');
			return;
		}
		this._unfoldClassName = new SelectorHold(subList, {prefix: '_'});
		this._subList = subList;
	}

	ngOnChanges(changes: SimpleChanges) {
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			const value = change.currentValue;
			this[key] = value;

			if (key === 'icon') {
				this.icon$.next(value);
			}
		});
	}

	toggle() {
		this._unfold = !this._unfold;
		this.fold(this._unfold);
	}

	fold(flag?: boolean);
	fold(flag = true) {
		this._unfoldClassName.set(flag ? 'fold' : 'unfold');
	}

	unfold(flag?: boolean);
	unfold(flag = true) {
		this.fold(!flag);
	}
}
