import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DotRatioBoxComponent} from './dot-ratio-box.component';
import {DotRatioBoxContentDirective} from './dot-ratio-box-content.directive';
import {DotRatioBoxDirective, DotRatioBoxStyleComponent, DotRatioBoxStyleService} from './dot-ratio-box';

const views = [
	DotRatioBoxComponent,
	DotRatioBoxDirective,
	DotRatioBoxStyleComponent,
	DotRatioBoxContentDirective
];

const localViews = [];

const modules = [
	CommonModule
];

const localModules = [];

const providers = [
	DotRatioBoxStyleService
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
export class DotRatioBoxModule {

}