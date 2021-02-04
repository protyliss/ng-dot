import {filter} from 'rxjs/operators';

export const emptyFilter = filter(value => value !== null && value !== undefined);