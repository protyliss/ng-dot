import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector       : 'dot-navs',
	template       : `
        <ng-content></ng-content>
	`,
	styleUrls      : [
		'./navs.scss'
	],
	encapsulation  : ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host           : {
		id   : 'dot-navs',
		role : 'navigation'
	}
})
export class DotNavsComponent {

}
