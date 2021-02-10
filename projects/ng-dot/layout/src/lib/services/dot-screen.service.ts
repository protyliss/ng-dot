import {DOCUMENT} from '@angular/common';
import {ElementRef, Inject, Injectable} from '@angular/core';
import {getNode} from '@ng-dot/core';
import {BehaviorSubject} from 'rxjs';

const STORE_NAME = '_ngFullScreen';
const STATE_CLASS = '_fullscreen';

function nothing() {

}

@Injectable({
	providedIn: 'root'
})
export class DotScreenService {
	full$ = new BehaviorSubject(false);
	isFull = false;

	document: Document;

	constructor(@Inject(DOCUMENT) document: any) {
		this.document = document as Document;
	}

	full(target: ElementRef | HTMLElement);
	full(target) {
		const {document, full$} = this;

		const node = getNode(target);
		const {classList} = node;

		if (!node.hasOwnProperty(STORE_NAME)) {
			node[STORE_NAME] = true;
			// using pure for does not care about element destroy
			node.addEventListener('fullscreenchange', () => {
				if (document['fullscreenElement']) {
					classList.add(STATE_CLASS);
					full$.next(true);
					this.isFull = true;
				} else {
					classList.remove(STATE_CLASS);
					full$.next(false);
					this.isFull = false;
				}
			});
		}

		if (!classList.contains(STATE_CLASS)) {
			this.exit();
			node.requestFullscreen()
				.then(nothing);
		}
	}

	exit() {
		const {document} = this;
		if (document['fullscreenElement']) {
			document.exitFullscreen()
				.then(nothing);
			this.full$.next(false);
			this.isFull = false;
		}
	}

	invert(target: ElementRef | HTMLElement);
	invert(target) {
		if (document['fullscreenElement']) {
			this.exit();
			return false;
		} else {
			this.full(target);
			return true;
		}
	}
}
