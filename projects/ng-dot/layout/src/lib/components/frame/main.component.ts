import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'dot-main',
	template: `
		<div id="dot-main-area" #gridNode [attr.data-scroller]="scroller">
			<ng-content></ng-content>
		</div>
	`,
	styleUrls: [
		'./frame.scss'
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		id: 'dot-main',
		role: 'main'
	}
})
export class MainComponent {
	@Input() scroller: boolean;
}
