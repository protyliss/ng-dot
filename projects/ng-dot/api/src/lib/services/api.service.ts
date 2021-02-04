import {Injectable} from '@angular/core';
import {ApiRoot} from '../classes/api-root';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  root(path?: string)
  root(path?) {
    return new ApiRoot(path);
  }
}
