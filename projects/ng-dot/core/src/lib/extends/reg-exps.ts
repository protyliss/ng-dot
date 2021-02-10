// @dynamic
export class RegExps extends RegExp {
	static readonly NUMBER = /^\d+$/;
	static readonly NUMERIC = /^[+-]?\d+(\.\d+)?$/;
	static readonly EMAIL = /^\w[_\-+\w]*@([\-\w]+)(\.[\-\w]+)+$/;

	/**
	 * Phone Number
	 * 1234-1234
	 * 123-1234
	 * 1234-1234
	 * 01-123-1234
	 * 01-1234-1234
	 * 012-123-1234
	 * 012-1234-1234
	 * +123 1234-1234
	 */
	static readonly TEL = /^(\+\d{1,3}(?:(?:\s\d{1,4}){1,2})?\s)?(\d{2,4}(?:-\d{3,4}(?:-\d{4})?))$/;

	static readonly UNIXTIME = /^\d{13}$/;

	static readonly TIMESTAMP = /^(\d{2,4})[-./](1[012]|0?\d)[-./]([12]\d|3[01]|0?\d)(?:[T\s](1\d|2[0-4]|0?\d)(?:\:([1-5]\d|0?\d)(?:\:(([1-5]\d|0?\d))(?:\.(\d+)?)?)?)?)?([+-]\d{4})?$/;

	static readonly PATH = /^(\/?[\w-:]+)(\/[\w-:]+)+$/;

	static readonly IP4 = /^\d{1,3}(\.\d{1,3}){3}$/;

	static readonly TRUE_LIKE = /^true|[+-]?[1-9]\d*$/i;

	static escape(pattern: string) {
		return pattern
			.replace(/([+?*\[\]()])/g, '\\\\$1');
	}

	static from(pattern: RegExp | string, flag?: string);
	static from(pattern, flag?) {
		return new RegExps(pattern, flag);
	}

	constructor(pattern: RegExp | string, flag?: string) {
		if (typeof pattern === 'string') {
			pattern = RegExps.escape(pattern);
		}
		super(pattern, flag);
	}
}
