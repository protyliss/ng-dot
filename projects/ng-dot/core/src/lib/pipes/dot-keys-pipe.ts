import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'keys'})
export class DotKeysPipe implements PipeTransform {
	transform<T extends Object>(value: T): any {
		return Object.keys(value);
	}
}

@NgModule({
    declarations: [
		DotKeysPipe
    ],
    exports: [
		DotKeysPipe
    ]
})
export class DotKeysPipeModule {

}