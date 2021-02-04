import {ChangeDetectionStrategy, Component, Host, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'dot-pad',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: [
		'./frame.scss'
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-pad'
	}
})
export class PadComponent {
}
