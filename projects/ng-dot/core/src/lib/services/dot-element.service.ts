import {ElementRef, Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {getNode} from '../functions/get-node';
import {DotResizeEventService} from './dot-resize-event.service';

@Injectable({
	providedIn: 'root'
})
export class DotElementService {
	protected documentElement: HTMLElement;

	constructor(
		protected _resize: DotResizeEventService,
		@Inject(DOCUMENT) protected document: any
	) {
		this.documentElement = (document as Document).documentElement;
	}

	availableSize$(node: ElementRef | HTMLElement): Observable<{ width: number, height: number }>;
	availableSize$(node) {
		node = getNode(node);
		return this._resize.size$
			.pipe(
				debounceTime(240),
				map(size => {
					let parent = node.parentNode;
					while (parent.nodeType === 1) {
						if (isNotInlineElement(parent)) {
							return {
								width: parent.scrollWidth,
								height: getHeight(parent, size.height)
							};
						}
						parent = parent.parentNode;
					}
					return size;
				})
			);
	}
}

function isNotInlineElement(node: HTMLElement);
function isNotInlineElement(node) {
	return getComputedStyle(node).getPropertyValue('display') !== 'inline';
}

function getHeight(node: HTMLElement, maxHeight: number);
function getHeight(node, maxHeight: number) {
	let parent = node;
	let grand;
	let height;
	let styleHeight;
	let usedPercent;
	while (parent.nodeType === 1) {
		height = parent.scrollHeight;
		styleHeight = parent.style['height'];

		if (usedPercent || styleHeight.endsWith('%')) {
			usedPercent = true;
			grand = parent.parentNode;
			if (grand.nodeType !== 1 || grand.style['height'] === '') {
				parent = grand;
				continue;
			}
		}
		if (isNotInlineElement(parent)) {
			if (height) {
				break;
			}
		}
		parent = parent.parentNode;
	}
	if (!height) {
		height = maxHeight;
	}
	return maxHeight;
}
