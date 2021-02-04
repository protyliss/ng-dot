import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DotScrollPushDirective} from './dot-scroll-push.directive';

const views = [
	DotScrollPushDirective
];

const modules = [
	CommonModule
];

@NgModule({
	declarations: views,
	imports: [
		...modules
	],
	exports: [
		...views,
		...modules
	]
})
export class DotScrollPushModule {

}
