import {Inject, Injectable, Optional} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {Subject} from 'rxjs';
import {getQueryValue} from '@ng-dot/core';

@Injectable({
	providedIn: 'root'
})
export class DotRouteEventService {

	protected _document: HTMLElement;

	started$ = new Subject<string>();
	ended$ = new Subject<string>();

	url: string;

	constructor(
		@Optional() protected _router: Router,
		@Inject(DOCUMENT) _document
	) {
		const {documentElement} = _document;

		this._document = documentElement;

		if (!_router) {
			return;
		}

		_router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.url = event.url;
				this.started$.next(this.url);
			} else if (event instanceof NavigationEnd) {
				const url = event.urlAfterRedirects || event.url;
				this.url = url;
				this.ended$.next(this.url);
			}
		});
	}

	query(key: string) {
		return getQueryValue(this.url, key);
	}
}
