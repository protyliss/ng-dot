import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'stringify'
})
export class DotStringifyPipe implements PipeTransform {
	transform(value: any, depth = 2): string {
		return JSON.stringify(value, null, depth);
	}
}

@NgModule({
    declarations: [
		DotStringifyPipe
    ],
    exports: [
		DotStringifyPipe
    ]
})
export class DotStringifyPipeModule {

}