import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DotResizeEventService {

	protected _documentElement: HTMLElement;

	size$: BehaviorSubject<{ width: number, height: number }>;
	width$: Observable<number>;
	height$: Observable<number>;

	constructor(@Inject(DOCUMENT) document: HTMLDocument) {
		this._documentElement = document.documentElement;

		const size$ = new BehaviorSubject(this.getSize());

		this.size$ = size$;

		this.width$ = size$
			.pipe(
				map(size => size.width),
				distinctUntilChanged()
			);

		this.height$ = size$
			.pipe(
				map(size => size.height),
				distinctUntilChanged()
			);

		fromEvent(window, 'resize')
			.subscribe(() => {
				size$.next(this.getSize());
			});
	}

	getSize() {
		const {clientWidth: width, clientHeight: height} = this._documentElement;
		return {width, height};
	}
}
