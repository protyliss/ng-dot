import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DotFormFieldComponent} from './dot-form-field.component';

const views = [
	DotFormFieldComponent
];

const localViews =  [
];

const modules = [
    CommonModule
];

const localModules = [
];

const providers = [
];

@NgModule({
    declarations: [
        ...views,
        ...localViews
    ],
    imports: [
        ...modules,
        ...localModules
    ],
    exports: [
        ...views,
        ...modules
    ],
    providers
})
export class DotFormFieldModule {

}