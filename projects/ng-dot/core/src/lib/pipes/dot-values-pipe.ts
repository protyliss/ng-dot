import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'values'})
export class DotValuesPipe implements PipeTransform {
	transform<T extends Object>(value: T): any {
		return Object.values(value);
	}
}

@NgModule({
	declarations: [
		DotValuesPipe
	],
	exports: [
		DotValuesPipe

	]
})
export class DotValuesPipeModule {

}