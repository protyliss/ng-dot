import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControlComponentBase} from '../classes/form-control-component-base';

@Component({
	selector: 'dot-form-input',
	template: `
		<dot-form-field>
			<label>
				<span [innerHTML]="control.label"></span>
				<input [type]="control.type"
					   [placeholder]="control.placeholder"
					   [required]="control.required"
					   [readOnly]="control.readonly"
					   [disabled]="control.disabled"
				>
			</label>
		</dot-form-field>
	`,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-form-control dot-form-input',
	},
	providers: []
})
export class DotFormInputComponent extends FormControlComponentBase {
}