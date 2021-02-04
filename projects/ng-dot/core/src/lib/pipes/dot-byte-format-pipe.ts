import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {toByteFormat} from '../functions/numbers/to-byte-format';

@Pipe({
	name: 'byteFormat'
})
export class DotByteFormatPipe implements PipeTransform {
	transform(bytes: number, decimals = 2) {
		return toByteFormat(bytes, decimals);
	}
}

@NgModule({
    declarations: [
		DotByteFormatPipe
    ],
    exports: [
		DotByteFormatPipe
    ]
})
export class DotByteFormatPipeModule {

}