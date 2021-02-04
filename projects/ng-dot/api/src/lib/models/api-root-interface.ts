import {ApiBaseInterface}                                   from './api-base-interface';
import {ApiDefaultBody, ApiDefaultPath, ApiDefaultResponse} from '../types';

export interface ApiRootInterface<PATH = ApiDefaultPath, BODY = ApiDefaultBody, RESPONSE = ApiDefaultResponse>
	extends ApiBaseInterface<PATH, BODY, RESPONSE> {
}
