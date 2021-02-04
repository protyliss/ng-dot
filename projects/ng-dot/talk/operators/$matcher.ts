export function $matcher(matcherFunction: (requestData, responseData) => boolean) {
	return dotOperator(
		'matcher',
		function matcherOperation(requestData, responseData) {
			return matcherFunction(requestData, responseData);
		}
	);
}

export function dotOperator<T extends (...args: any[]) => any>(meta: string, operatorFunction: T): T {
	operatorFunction['_dotOperator'] = meta;
	return operatorFunction;
}