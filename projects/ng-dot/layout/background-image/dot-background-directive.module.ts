import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DotBackgroundImageDirective} from './dot-background-image.directive';

const views = [
	DotBackgroundImageDirective
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
export class DotBackgroundDirectiveModule {

}
