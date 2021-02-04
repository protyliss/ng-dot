import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
	selector: 'img[dotFilePreview]',
	host: {
		class: 'dot-file-preview',
		'[hidden]': '!loaded'
	},
	providers: []
})
export class DotFilePreviewDirective implements OnInit, OnChanges {
	@Input('dotFilePreview') set fromSelector(file: File) {
		if (file) {
			this.file = file;
		}
	}

	@Input() file: File;

	loaded = true;

	protected _node: HTMLImageElement;

	constructor(elementRef: ElementRef<HTMLImageElement>) {
		this._node = elementRef.nativeElement;
	}

	ngOnInit() {
		this._render();
	}

	ngOnChanges(changes: SimpleChanges) {
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			const value = change.currentValue;

			this[key] = value;

			if (key === 'file') {
				this._render();
			}
		});
	}

	protected _render() {
		const {file, _node} = this;
		_node.addEventListener('load', onLoad);
		_node.src = URL.createObjectURL(file);
	}
}

function onLoad(this: HTMLImageElement) {
	URL.revokeObjectURL(this.src);
	this.removeEventListener('load', onLoad);
}