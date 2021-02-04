import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DotHttpStateService} from '../services/dot-http-state.service';

@Injectable()
export class DotHttpRequestInterceptor implements HttpInterceptor {
	constructor(protected _httpState: DotHttpStateService) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const {_httpState} = this;
		_httpState.request();
		return next.handle(request)
			.pipe(
				tap({
					next: (event: HttpEvent<any>) => {
						// event.type = 0 is cancel
						if (event instanceof HttpResponse || event.type === 0) {
							_httpState.response();
						}
					},
					error: (event) => {
						if (event instanceof HttpErrorResponse) {
							_httpState.response();
						}
					}
				})
			);
	}
}
