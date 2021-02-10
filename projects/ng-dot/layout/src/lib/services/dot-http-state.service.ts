import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {Debounce, SelectorToggle} from '@ng-dot/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable()
export class DotHttpStateService {
	protected _requested = 0;

	protected _isLoad$ = new BehaviorSubject<boolean>(false);

	isLoad$: Observable<boolean>;

	constructor(
		@Inject(DOCUMENT) document: any
	) {
		this.isLoad$ = this._isLoad$
			.pipe(
				distinctUntilChanged()
			);

		(new SelectorToggle((document as Document).documentElement, '_loading'))
			.take(this.isLoad$);
	}

	request() {
		this._requested++;
		const {_isLoad$} = this;
		if (!_isLoad$.value) {
			_isLoad$.next(true);
		}
	}

	response() {
		if (--this._requested <= 0) {
			this._loaded();
		}
	}

	@Debounce(2000)
	protected _loaded() {
		this._requested = 0;
		this._isLoad$.next(false);
	}
}
