import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MainComponent} from './main.component';

@Component({
	selector: 'dot-section',
	template: `
		<ng-content></ng-content>
	`,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./section.scss'],
	host: {
		class: 'dot-section'
	}
})
export class SectionComponent {
	constructor(main: MainComponent) {
	}
}
