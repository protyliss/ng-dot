import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'dot-foot',
	template: `
		<div id="dot-foot-area" #gridNode>
			<ng-content></ng-content>
		</div>
	`,
	styleUrls: [
		'./frame.scss'
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		id: 'dot-foot'
	}
})
export class FootComponent {
}
