import {NgModule} from '@angular/core';
import {TransDirective} from './trans.directive';
import {TransStyleComponent} from './trans-style.component';
import {TransStyleService} from './trans-style.service';

const declarations = [
	TransDirective,
	TransStyleComponent
];

@NgModule({
	declarations,
	exports: declarations,
	providers: [
		TransStyleService
	]
})
export class DotTransModule {
}
