import {Numbers} from './numbers';

export class Uri {

	/**
	 * get ws uri
	 * @param value
	 */
	static forWs(value: number | string);
	static forWs(value) {
		value = value.toString();

		const protocol = Uri.getProtocol(value, 'ws') + '://';
		
		const slugs = value.split('/');
		const hostName = slugs.shift();
		const path = slugs.join('/');

		let uri;

		if (Numbers.isNumber(hostName)) {
			uri = `${protocol}${location.hostname}:${value}`;
		} else {
			uri = `${protocol}${hostName}`;
		}
		
		return path ?
			uri + '/' + path :
			uri;
	}

	static getProtocol(value, protocol = 'http') {
		const glue = value.toString().indexOf('://');
		return glue > -1 ?
			value.substr(0, glue) :
			location.protocol.startsWith('https') ?
				protocol + 's' :
				protocol;
	}
}