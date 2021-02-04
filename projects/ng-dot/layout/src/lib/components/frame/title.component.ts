import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {MainComponent} from './main.component';

@Component({
	selector: 'dot-title',
	template: `
		<dot-pad>
			<h1>
				<ng-content></ng-content>
			</h1>
		</dot-pad>
	`,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		id: 'dot-main-title'
	}
})
export class TitleComponent {
	constructor(main: MainComponent) {
	}
}
