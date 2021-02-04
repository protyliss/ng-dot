import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CommonModule} from '@angular/common';

@Pipe({
	name: 'isString'
})
export class DotIsStringPipe implements PipeTransform {
	transform(value): any {
		return typeof value === 'string';
	}
}

@NgModule({
    declarations: [
    	DotIsStringPipe
	],
    exports: [
		DotIsStringPipe
    ]
})
export class DotIsStringPipeModule {

}