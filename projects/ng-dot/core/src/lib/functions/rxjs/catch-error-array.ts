import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';

export const catchErrorArray = catchError(reason => {
	return of([]);
});