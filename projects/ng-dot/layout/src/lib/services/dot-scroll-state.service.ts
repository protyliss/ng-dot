import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {DotScrollEventService, SelectorToggle} from '@ng-dot/core';

@Injectable({
	providedIn: 'root'
})
export class DotScrollStateService {

	constructor(
		protected _scrollEvent: DotScrollEventService,
		@Inject(DOCUMENT) document: any
	) {

		const {documentElement} = document as Document;

		const ignoreTime = 240;

		(new SelectorToggle(documentElement, '_scrolling'))
			.take(_scrollEvent.scrolling$);

		(new SelectorToggle(documentElement, '_scrolled'))
			.take(_scrollEvent.scrolled$);

		(new SelectorToggle(documentElement, '_scrolled-x'))
			.take(_scrollEvent.xScrolled$);

		(new SelectorToggle(documentElement, '_scrolled-y'))
			.take(_scrollEvent.yScrolled$);

	}
}
