import {NgModule} from '@angular/core';
import {DotRippleDirective} from './dot-ripple.directive';
import {DotRippleStyleComponent, DotRippleStyleService} from './with-ripple';


@NgModule({
	declarations: [
		DotRippleStyleComponent,
		DotRippleDirective
	],
	providers: [
		DotRippleStyleService
	]
})
export class DotRippleModule {

}
