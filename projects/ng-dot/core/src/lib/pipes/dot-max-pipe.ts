import {NgModule} from '@angular/core';

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'max'
})
export class DotMaxPipe implements PipeTransform {
	transform(value: [number, number]): number {
		return Math.max(...value);
	}
}

@NgModule({
	declarations: [
		DotMaxPipe
	],
	exports: [
		DotMaxPipe
	]
})
export class DotMaxPipeModule {
}