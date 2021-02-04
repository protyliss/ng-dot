import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CommonModule} from '@angular/common';

@Pipe({
	name: 'age'
})
/**
 * Return to Korean Age
 */
export class DotAgePipe implements PipeTransform {
	transform(value: string): number {
		const birthday = new Date(value);
		const now = new Date;
		let age = now.getFullYear() - birthday.getFullYear();

		if (now.getMonth() < birthday.getMonth() && now.getDate() < birthday.getDate()) {
			age--;
		}

		return age;
	}
}


@NgModule({
    declarations: [
		DotAgePipe
    ],
    imports: [
		CommonModule
    ],
    exports: [
		DotAgePipe
    ]
})
export class DotAgePipeModule {

}