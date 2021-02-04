import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DotFilePreviewDirective} from './dot-file-preview.directive';

const views = [
	DotFilePreviewDirective
];

const localViews =  [
];

const modules = [
	CommonModule
];

const localModules = [
];

const providers = [
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
export class DotFilePreviewDirectiveModule {

}