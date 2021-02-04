import {EchoBase} from './echo-base';
import {Echo} from './echo';
import {filter, tap} from 'rxjs/operators';
import {Observable, pipe, UnaryFunction} from 'rxjs';
import {Listen} from './listen';

export class EchoFactory<REQUEST = any, RESPONSE = any> {
	protected _community: EchoBase;
	protected source: Listen<RESPONSE>;
	protected _operators: any[] = [];

	type: string;

	constructor(community: EchoBase, type: string, source: Listen<RESPONSE>) {
		this._community = community;
		this.type = type;
		this.source = source;
	}

	pipe(...operators: any[]) {
		this._operators.push(...operators);
		return this;
	}

	echo$(dataset: REQUEST);
	echo$(dataset) {
		const echo: Observable<any> = new Echo(
			this._community,
			this.type,
			dataset,
			this.source
		);

		const {_operators} = this;
		const end = _operators.length;
		let current = -1;
		
		const rxOperations: UnaryFunction<any, any>[] = [];

		while (++current < end) {
			const operator = _operators[current];
			switch (operator['_dotOperator']) {
				case 'matcher':
					rxOperations.push(
						filter(response => {
							return operator(dataset, response);
						})
					);
					continue;
				default:
					rxOperations.push(operator);
			}
		}
		
		return rxOperations.length ?
			echo.pipe.apply(echo, rxOperations) :
			echo;
	}
}