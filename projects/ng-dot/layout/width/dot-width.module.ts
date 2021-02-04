import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DotWithDirective, WidthStyleComponent, WidthStyleService} from './dot-width';

const views = [
	DotWithDirective
];

const localViews = [
	WidthStyleComponent
];

const modules = [
	CommonModule
];

const localModules = [];

const providers = [
	WidthStyleService
];

@NgModule({
	declarations: [
		...views,
		...localViews
	],
	imports: [
		...modules,
		...localModules
	],
	exports: [
		...views,
		...modules
	],
	providers
})
export class DotWidthModule {
}
