import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControlComponentBase} from '../classes/form-control-component-base';

@Component({
	selector: 'dot-form-textarea',
	template: `
		<dot-form-field>
			<label>
				<span [innerHTML]="control.label"></span>
				<textarea
					[placeholder]="control.placeholder"
					[required]="control.required"
					[readOnly]="control.readonly"
					[disabled]="control.disabled"
				></textarea>
			</label>
		</dot-form-field>
	`,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-form-control dot-form-textarea',
	},
	providers: []
})
export class DotFormTextareaComponent extends FormControlComponentBase {
}