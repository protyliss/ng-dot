import {DOCUMENT} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {getCookie, setCookie} from '@ng-dot/core';

const $splashes: Record<string, boolean> = {};

@Component({
	selector: 'dot-splash',
	template: `
		<div class="dot-splash-wrap">
			<div class="dot-splash-area">
				<ng-content></ng-content>
			</div>
		</div>
	`,
	styleUrls: ['./splash.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-splash',
	},
	providers: []
})
export class DotSplashComponent implements OnInit {
	private _documentClassList: DOMTokenList;
	private _node: HTMLElement;

	@Input() id = 'default';

	@Input() duration = 2000;

	@Input() loop = false;

	constructor(
		@Inject(DOCUMENT) document: any,
		_elementRef: ElementRef,
	) {
		this._documentClassList = (document as Document).documentElement.classList;
		this._node = _elementRef.nativeElement;
	}

	ngOnInit(): void {
		const {id, _documentClassList, _node} = this;
		const cookieId = 'splash_' + id;

		if ($splashes[id] || (!this.loop && getCookie(cookieId))) {
			return;
		}

		$splashes[id] = true;

		_documentClassList.add('_splashed');
		_node.style.display = 'block';

		setCookie(cookieId, 1);

		setTimeout(() => {
			this._node.style.display = 'none';
			_documentClassList.remove('_splashed');
		}, this.duration);
	}
}
