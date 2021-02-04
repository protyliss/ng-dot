import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'dot-space',
	template: `<ng-content></ng-content>`,
	styleUrls: ['./dot-pose.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-space',
	},
	providers: []
})
export class DotSpaceComponent {
}