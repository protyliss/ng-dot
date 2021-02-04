import {NgModule, Pipe, PipeTransform} from '@angular/core';

const _HTML = /<(\/)?[a-z]+[^>]*>/g;
@Pipe({
	name: 'removeHTML'
})
export class DotRemoveHtmlPipe implements PipeTransform {
	transform(value: string): string {
		return value.replace(_HTML, '');
	}
}

@NgModule({
	declarations: [
		DotRemoveHtmlPipe
	],
	exports: [
		DotRemoveHtmlPipe
	]
})
export class DotRemoveHtmlPipeModule {

}