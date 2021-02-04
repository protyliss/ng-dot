import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DelayedOptionsDirective} from './delayed-options.directive';
const views = [
  DelayedOptionsDirective
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
export class DotDelayedOptionsDirectiveModule {

}
