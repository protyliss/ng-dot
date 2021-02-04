import {Toast} from '../interfaces/toast';

export function confirmToast(toast: Toast);
export function confirmToast(toast) {
	if (toast) {
		toast.confirm();
	}
}