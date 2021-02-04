import {NgModule} from '@angular/core';
import {DotLiftDirective} from './dot-lift.directive';
import {DotLiftStyleComponent, DotLiftStyleService} from './with-lift';

const declarations = [
	DotLiftDirective,
	DotLiftStyleComponent
];

@NgModule({
	declarations,
	exports: declarations,
	providers: [
		DotLiftStyleService
	]
})
export class DotLiftModule {
}
