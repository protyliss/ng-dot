import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'toNumber'
})
export class DotToNumberPipe implements PipeTransform {
	transform(value: any): number {
		return typeof value === 'boolean' ?
			value ?
				1 :
				0 :
			parseFloat(value);
	}
}

@NgModule({
	declarations: [
		DotToNumberPipe
	],
	exports: [
		DotToNumberPipe
	]
})
export class DotToNumberPipeModule {

}