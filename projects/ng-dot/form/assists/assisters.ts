import {emailMap} from './email-map';
import {ip4Map} from './ip4-map';
import {telMap} from './tel-map';
import {urlMap} from './url-map';
import {FormControlAssistConfigure} from './interfaces';

export const ASSISTERS: Record<string, FormControlAssistConfigure> = {
	tel: telMap,
	email: emailMap,
	url: urlMap,
	ip4: ip4Map
};
