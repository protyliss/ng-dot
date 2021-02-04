import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';

export const catchErrorNull = catchError(() => {
	return of(null);
});