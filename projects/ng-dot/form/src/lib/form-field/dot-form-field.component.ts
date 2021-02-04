import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'dot-form-field',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: ['./dot-form-field.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-form-field',
	},
	providers: []
})
export class DotFormFieldComponent {
}