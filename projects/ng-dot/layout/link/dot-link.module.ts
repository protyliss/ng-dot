import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DotRippleModule} from '@ng-dot/layout/ripple';
import {DotLinkComponent} from './dot-link.component';

const views = [
	DotLinkComponent
];

const localViews = [];

const modules = [
	CommonModule,
	DotRippleModule
];

const localModules = [];

const providers = [];

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
export class DotLinkModule {

}
