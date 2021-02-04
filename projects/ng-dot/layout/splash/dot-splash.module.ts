import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DotSplashComponent} from './dot-splash.component';

const views = [
	DotSplashComponent
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
export class DotSplashModule {

}