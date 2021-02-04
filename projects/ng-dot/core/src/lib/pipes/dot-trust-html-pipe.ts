import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'trustHTML'})
export class DotTrustHtmlPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {
	}

	transform(html: string) {
		return this.sanitizer.bypassSecurityTrustHtml(html);
	}
}

@NgModule({
	declarations: [
		DotTrustHtmlPipe
	],
	exports: [
		DotTrustHtmlPipe
	]
})
export class DotTrustHtmlPipeModule {

}