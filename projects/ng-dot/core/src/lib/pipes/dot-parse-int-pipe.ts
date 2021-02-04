import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'parseInt'
})
export class DotParseIntPipe implements PipeTransform {
	transform(value: number | string): number {
		return parseInt(value as string, 10);
	}
}
@NgModule({
    declarations: [
		DotParseIntPipe
    ],
    exports: [
		DotParseIntPipe
    ]
})
export class DotParseIntPipeModule {

}