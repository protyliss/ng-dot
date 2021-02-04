import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'toBoolean'
})
export class DotToBooleanPipe implements PipeTransform {
	transform(value: any): boolean {
		switch (typeof value) {
			case 'boolean':
				return value;
			case 'number':
				return value > 0;
			case 'string':
				return value !== '0' && value !== 'false';
		}
		
		return !!value;
	}
}

@NgModule({
	declarations: [
		DotToBooleanPipe
	],
	exports: [
		DotToBooleanPipe
	]
})
export class DotToBooleanPipeModule {

}