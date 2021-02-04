import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'entries'})
export class DotEntriesPipe implements PipeTransform {
	transform<T extends Object>(value: T): any {
		return Object.entries(value);
	}
}
@NgModule({
	declarations: [
		DotEntriesPipe
	],
	exports: [
		DotEntriesPipe
	]
})
export class DotEntriesPipeModule {

}