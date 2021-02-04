import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CommonModule} from '@angular/common';

@Pipe({
	name: 'isNumber'
})
export class DotIsNumberPipe implements PipeTransform {
	transform(value): any {
		return typeof value === 'string';
	}
}

@NgModule({
    declarations: [
		DotIsNumberPipe
	],
    exports: [
		DotIsNumberPipe
    ]
})
export class DotIsNumberPipeModule {

}