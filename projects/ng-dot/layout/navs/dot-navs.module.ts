import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DotIconModule} from '@ng-dot/layout/icon';
import {DotNavItemComponent} from './dot-nav-item.component';
import {DotNavComponent} from './dot-nav.component';
import {DotNavsComponent} from './dot-navs.component';

const views = [
	DotNavsComponent,
	DotNavComponent,
	DotNavItemComponent
];

const modules = [
	CommonModule,
	RouterModule,
	DotIconModule
];

@NgModule({
	declarations: [
		...views,
	],
	imports: [
		...modules
	],
	exports: [
		...views,
		...modules
	]
})
/**
 * cssdot - navigation
 */
export class DotNavsModule {

}
