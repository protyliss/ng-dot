import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable, Subject, timer} from 'rxjs';
import {distinctUntilChanged, filter, map, takeUntil} from 'rxjs/operators';

interface Xy {
	x: number;
	y: number;
}

const hasValueMap = map(value => value > 0);

@Injectable({
	providedIn: 'root'
})
export class DotScrollEventService {

	protected _x: number;
	protected _y: number;

	position$: BehaviorSubject<Xy>;
	x$: Observable<number>;
	y$: Observable<number>;

	scrollXOnly$: Observable<number>;
	scrollYOnly$: Observable<number>;

	scrolling$: Observable<boolean>;
	scrolled$: Observable<boolean>;
	xScrolled$: Observable<boolean>;
	yScrolled$: Observable<boolean>;

	constructor(@Inject(DOCUMENT) document: HTMLDocument) {

		const position$ = new BehaviorSubject(this._getPosition());
		const scrolling$ = new Subject<boolean>();

		this.position$ = position$;

		this.x$ = position$
			.pipe(
				map(position => position.x),
				distinctUntilChanged()
			);

		this.y$ = position$
			.pipe(
				map(position => position.y),
				distinctUntilChanged()
			);

		this.scrollXOnly$ = this.x$
			.pipe(
				filter(() => this._y === 0)
			);

		this.scrollYOnly$ = this.y$
			.pipe(
				filter(() => this._x === 0)
			);

		this.scrolling$ = scrolling$
			.pipe(
				distinctUntilChanged()
			);

		this.scrolled$ = position$
			.pipe(
				map(position => position.x > 0 || position.y > 0),
				distinctUntilChanged()
			);

		this.xScrolled$ = this.x$
			// pos => x
			// distinct
			.pipe(hasValueMap);

		this.yScrolled$ = this.y$
			// pos => y
			// distinct
			.pipe(hasValueMap);

		function scrollingEnd() {
			scrolling$.next(false);
		}

		fromEvent(document, 'scroll')
			.subscribe(() => {
				position$.next(this._getPosition());
				scrolling$.next(true);

				timer(640)
					.pipe(takeUntil(scrolling$))
					.subscribe(scrollingEnd);
			});
	}

	protected _getPosition() {
		const x = window.pageXOffset
			|| document.documentElement.scrollLeft
			|| document.body.scrollLeft || 0;

		const y = window.pageYOffset
			|| document.documentElement.scrollTop
			|| document.body.scrollTop || 0;

		this._x = x;
		this._y = y;

		return {
			x,
			y
		};
	}

	targetFrom(node: HTMLElement) {
		let target = node;
		do {
			const isScroll = target['_dotScrollable'] === undefined ?
				(overflow => overflow === 'auto' || overflow === 'scroll')(getComputedStyle(target)['overflow']) :
				target['_dotScrollable'];

			if (isScroll) {
				target['_dotScrollable'] = true;
				return new DotScrollEvent(target);
			}

			target['_dotScrollable'] = false;
			target = target.parentNode as HTMLElement;
		} while (target instanceof HTMLElement);

		return this;
	}
}

class DotScrollEvent {

	protected _node: HTMLElement;
	protected _x: number;
	protected _y: number;

	position$: BehaviorSubject<Xy>;
	scrolling$: Observable<boolean>;

	constructor(target: HTMLElement) {
		this._node = target;

		const position$ = new BehaviorSubject(this._getPosition());
		const scrolling$ = new Subject<boolean>();

		this.position$ = position$;

		this.scrolling$ = scrolling$
			.pipe(
				distinctUntilChanged()
			);

		function scrollingEnd() {
			scrolling$.next(false);
		}

		fromEvent(target, 'scroll')
			.subscribe(() => {
				position$.next(this._getPosition());
				scrolling$.next(true);

				timer(640)
					.pipe(takeUntil(scrolling$))
					.subscribe(scrollingEnd);
			});
	}

	protected _getPosition() {
		const {scrollTop: x, scrollLeft: y} = this._node;

		this._x = x;
		this._y = y;

		return {x, y};
	}
}
