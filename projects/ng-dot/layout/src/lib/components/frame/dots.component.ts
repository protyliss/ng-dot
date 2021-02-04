import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'dots',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: [
		'./frame.scss'
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		id: 'dots'
	}
})
export class DotsComponent {

}
