import {NgModule} from '@angular/core';
import {GridDirective} from './grid.directive';
import {GridStyleComponent, GridStyleService} from './with-grid';

const declarations = [
	GridDirective,
	GridStyleComponent
];

@NgModule({
	declarations,
	exports: declarations,
	providers: [
		GridStyleService
	]
})
export class DotGridModule {

}
