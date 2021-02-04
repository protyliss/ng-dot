import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DotLayoutModule} from '@ng-dot/layout';
import {DotGridModule} from '@ng-dot/layout/grid';
import {DotSelectComponent} from './dot-select.component';

const components = [
	DotSelectComponent
];

@NgModule({
	declarations: components,
	exports: components,
	imports: [
		CommonModule,
		DotLayoutModule,
		DotGridModule
	]
})
export class DotSelectModule {
}