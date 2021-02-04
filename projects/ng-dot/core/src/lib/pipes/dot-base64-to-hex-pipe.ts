import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {base64ToHex} from '../functions/strings/base64-to-hex';

@Pipe({
	name: 'base64ToHex'
})
export class DotBase64ToHexPipe implements PipeTransform {
	transform(value: string): string {
		return base64ToHex(value);
	}
}

@NgModule({
    declarations: [
		DotBase64ToHexPipe
    ],
    exports: [
		DotBase64ToHexPipe
    ]
})
export class DotBase64ToHexPipeModule {

}