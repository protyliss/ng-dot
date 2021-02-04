import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'min'
})
export class DotMinPipe implements PipeTransform {
	transform(value: [number, number]): number {
		return Math.max(...value);
	}
}

@NgModule({
	declarations: [
		DotMinPipe
	],
	exports: [
		DotMinPipe
	]
})
export class DotMinPipeModule {
}