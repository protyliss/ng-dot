import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DotFormFieldComponent} from './dot-form-field.component';

const views = [
	DotFormFieldComponent
];

@NgModule({
	declarations: views,
	imports: [
		CommonModule
	],
	exports: views
})
export class DotFormFieldModule {

}
