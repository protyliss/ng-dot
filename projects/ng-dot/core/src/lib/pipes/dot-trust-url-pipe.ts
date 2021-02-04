import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'trustUrl'})
export class DotTrustUrlPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {
	}

	transform(url: string) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}

@NgModule({
	declarations: [
		DotTrustUrlPipe
	],
	exports: [
		DotTrustUrlPipe
	]
})
export class DotTrustUrlPipeModule {

}