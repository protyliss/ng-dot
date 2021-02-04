import {CommonModule} from '@angular/common';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {IconComponent} from './icon.component';
import {Icon24Component} from './icon24.component';

const components = [
	IconComponent,
	Icon24Component
];

@NgModule({
	declarations: components,
	imports: [
		CommonModule,
	],
	exports: components
})
export class DotIconModule {

}