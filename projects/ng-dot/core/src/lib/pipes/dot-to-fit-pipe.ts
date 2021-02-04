import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {toFit} from '../functions/numbers/to-fit';

@Pipe({
	name: 'toFit'
})
export class DotToFitPipe implements PipeTransform {
	transform(value: number, size = 2) {
		return size ? toFit(value, size) : value;
	}
}

@NgModule({
	declarations: [
		DotToFitPipe
	],
	exports: [
		DotToFitPipe
	],
})
export class DotToFitPipeModule {

}