export interface NotifyAlertMessage {
	body: string;
}

interface NotifyAction {
	action: string;
	icon?: string;
	title: string;
}

type NotifySimpleAction = [string, string?];


export type NotifyActionLike = NotifyAction | NotifySimpleAction;

export interface NotifyInstanceMessage {
	title: string;
	body?: string;
	icon?: string;
	actions?: NotifyAction[];
}


export interface NotifyInterface {

	options(options: NotificationOptions);

	alert({title, body, icon}: NotifyInstanceMessage): this;
}
