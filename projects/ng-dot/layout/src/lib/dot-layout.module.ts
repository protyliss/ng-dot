import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {DotFrameModule} from './components/frame/dot-frame.module';
import {DotHttpRequestInterceptor} from './interceptors/dot-http-request.interceptor';
import {DotHttpStateService} from './services/dot-http-state.service';

const modules = [
	CommonModule,
	DotFrameModule
];

const providers = [
	DotHttpStateService,
	{
		provide: HTTP_INTERCEPTORS,
		useClass: DotHttpRequestInterceptor,
		multi: true
	}
];

@NgModule({
	imports: modules,
	exports: modules,
	providers
})
export class DotLayoutModule {

}
