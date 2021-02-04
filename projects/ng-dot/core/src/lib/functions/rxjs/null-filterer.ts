import {filter} from 'rxjs/operators';

export const nullFilterer = filter(value => value !== null);
