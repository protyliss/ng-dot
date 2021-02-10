import {NgModule} from '@angular/core';
import {DotFormControlsComponent} from './dot-form-controls.component';
import {DotFormInputComponent} from './dot-form-input.component';
import {DotFormSelectComponent} from './dot-form-select.component';
import {DotFormTextareaComponent} from './dot-form-textarea.component';
import {DotDynamicComponentMarkerModule} from '@ng-dot/core';
import {DotFormFieldModule} from '../form-field';

const views = [
	DotFormControlsComponent,
	DotFormInputComponent,
	DotFormTextareaComponent,
	DotFormSelectComponent
];

@NgModule({
	declarations: views,
	imports: [
		DotDynamicComponentMarkerModule,
		DotFormFieldModule
	],
	exports: views
})
export class DotFormControlsModule {

}
