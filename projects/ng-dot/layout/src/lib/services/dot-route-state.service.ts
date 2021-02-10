import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {isNumber, parseUrl} from '@ng-dot/core';
import {DotRouteEventService} from '@ng-dot/route';


const _glue = /[\?#]/;
const _className = /path_[^\s]+/g;

@Injectable({
	providedIn: 'root'
})
export class DotRouteStateService {
	protected _documentElement: HTMLElement;

	constructor(
		protected _routeEvent: DotRouteEventService,
		@Inject(DOCUMENT) document: any
	) {

		this._documentElement = document.documentElement;

		_routeEvent.started$
			.subscribe(url => {
				if (url.indexOf('#') < 0) {
					const scroller = (document as Document).querySelector('[data-scroller]') as HTMLElement;
					if (scroller && scroller.dataset.scroller === 'true') {
						scroller.scrollTo(0, 0);
					} else {
						window.scrollTo(0, 0);
					}
				}
			});

		_routeEvent.ended$
			.subscribe(url => {
				const parsed = parseUrl(url);
				const {hash} = parsed;

				this._setPathClass(parsed.path);

				if (hash) {
					const target = document.getElementById(hash);
					if (target) {
						target.scrollIntoView();
					}
				}
			});
	}

	protected _setPathClass(path: string) {
		const {_documentElement} = this;
		const {classList} = _documentElement;

		_documentElement.className = _documentElement.className
			.replace(_className, '');

		const slugs = (path.slice(1) || 'index').split('/');
		const end = slugs.length;
		const lastClassNames = ['path'];
		let current = -1;
		let slug;
		let className;
		let lastClassNameCurrent: number;
		let lastClassName;

		while (++current < end) {
			slug = slugs[current];

			lastClassNameCurrent = lastClassNames.length;
			while (lastClassNameCurrent-- > 0) {
				lastClassName = lastClassNames[lastClassNameCurrent];
				className = lastClassName + '_' + slug;
				classList.add(className);

				lastClassNames[lastClassNameCurrent] = className;

				if (isNumber(slug)) {
					classList.add(lastClassName + '_any');
					lastClassNames.push(lastClassName + '_any');
				}
			}
		}

	}
}
