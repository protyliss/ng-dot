import {DotFloatPosition} from '@ng-dot/core';

export interface DotToastConfigure {
	position: DotFloatPosition;
}

export interface Toast {
	confirm();
}

export interface ToastOperatorInterface {
	primary(body: string): Toast;

	accent(body: string): Toast;

	warn(body: string): Toast;

	confirmed(toast: Toast);
}