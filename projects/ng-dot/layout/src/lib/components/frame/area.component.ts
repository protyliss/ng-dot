import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
@Component({
	selector       : 'dot-area',
	template       : `
		<ng-content></ng-content>
	`,
  styleUrls: ['./frame.scss'],
	encapsulation  : ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host           : {
		class: 'dot-area'
	}
})
export class AreaComponent {
}
