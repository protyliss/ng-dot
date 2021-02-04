import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'toFixed'
})
export class DotToFixedPipe implements PipeTransform {
	transform(value: number, size = 2) {
		return size && typeof value === 'number' ?
			value.toFixed(size) :
			value;
	}
}

@NgModule({
	declarations: [
		DotToFixedPipe
	],
	exports: [
		DotToFixedPipe
	],
})
export class DotToFixedPipeModule {

}