import {ElementRef, Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

const $key = '_ngdotVisibleIndex';
const $store: Record<number, {
	subject: BehaviorSubject<boolean>,
	observer: Observable<boolean>
}> = {};

const $visibles: Record<number, boolean> = {};

let $indexes: string[];
let $index = 0;

let $intersectionObserver: IntersectionObserver;

@Injectable({
	providedIn: 'root'
})
export class DotVisibilityService {
	protected document: Document;
	constructor(@Inject(DOCUMENT) document: any) {
		this.document = document as Document;
		document.addEventListener('visibilitychange', onVisibilityChange);
		$intersectionObserver = new IntersectionObserver(onIntersectionChange);
	}

	/**
	 * observe element
	 * @param elementRef
	 */
	observe$(elementRef: ElementRef): Observable<boolean>;
	observe$(elementRef) {
		const node = elementRef.nativeElement;
		let index = node[$key];

		if (index !== undefined) {
			return $store[index].observer;
		}

		index = $index++;
		node[$key] = index;

		const subject = new BehaviorSubject<boolean>(false);
		const observer = subject.pipe(
			filter(visible => {
				if ($visibles[index] !== visible) {
					$visibles[index] = visible;
					return true;
				}
				return false;
			})
		);

		$store[index] = {
			subject,
			observer
		};

		$indexes = Object.keys($store);
		$intersectionObserver.observe(node);

		return observer;
	}

	/**
	 * unobserve element
	 * @param elementRef
	 */
	unobserve(elementRef: ElementRef): this;
	unobserve(elementRef) {
		const node = elementRef.nativeElement;
		const index = node[$key];
		if (index === undefined) {
			return this;
		}

		delete node[$key];
		delete $store[index];
		delete $visibles[index];

		$indexes = Object.keys($store);
		$intersectionObserver.unobserve(node);

		return this;
	}
}

function onVisibilityChange() {
	const visible = !document.hidden;
	if (!$indexes) {
		return;
	}
	let end = $indexes.length;
	let index;
	while (end-- > 0) {
		index = $indexes[end];
		if ($visibles[index]) {
			$store[index]
				.subject
				.next(visible);
		}
	}
}

function onIntersectionChange(entries: IntersectionObserverEntry[]);
function onIntersectionChange(entries) {
	let end = entries.length;
	let entry;
	while (end-- > 0) {
		entry = entries[end];
		$store[entry.target[$key]]
			.subject
			.next(
				entry.isIntersecting
			);
	}
}
