import {SpeakBase} from './speak-base';

export class SpeakFactory<REQUEST = any, RESPONSE = any> {
	protected _community: SpeakBase;

	type: string;

	constructor(operator: SpeakBase, type: string) {
		this._community = operator;
		this.type = type;
	}

	speak(dataset: REQUEST) {
		// this._community.open();
		this._community.send(JSON.stringify({
			type: this.type,
			dataset
		}));
	}
}