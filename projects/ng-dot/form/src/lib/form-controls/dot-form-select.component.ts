import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControlComponentBase} from '../classes/form-control-component-base';

@Component({
	selector: 'dot-form-input',
	template: `
		<dot-form-field>
			<label>
				<span [innerHTML]="control.label"></span>
				<select
					[required]="control.required"
					[disabled]="control.disabled"
				>
				</select>
			</label>
		</dot-form-field>
	`,
	styleUrls: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-form-control dot-form-input',
	},
	providers: []
})
export class DotFormSelectComponent extends FormControlComponentBase {


}