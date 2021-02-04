import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DotSpaceComponent} from './dot-space.component';
import {DotRowDirective} from './dot-row.directive';
import {DotPoseStyleComponent, DotPoseStyleService} from './dot-pose-style';
import {DotColumnDirective} from './dot-column.directive';

const views = [
	DotPoseStyleComponent,
	DotSpaceComponent,
	DotRowDirective,
	DotColumnDirective
];

const localViews = [];

const modules = [
	CommonModule
];

const localModules = [];

const providers = [
	DotPoseStyleService
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
export class DotPoseModule {

}