import {FormControlAssistConfigure} from './interfaces';

export const emailMap: FormControlAssistConfigure = {
	add: (function (...services) {
		const result = [];
		const end = services.length;
		let current = -1;
		let host;
		let vendor;
		let domain;
		while (++current < end) {
			host = services[current].split('.');
			vendor = host.shift();
			domain = host.join('.')
				.replace(/\./g, '\\\\.');
			result.push(
				[
					new RegExp(`^([^@]+@${vendor}\.)$`),
					'$1' + domain
				],
				[
					new RegExp(`^([^@]+@${vendor}\.${domain})\.${domain}+$`),
					'$1'
				]
			);
		}
		return result;
	})(
		'gmail.com',
		'naver.com',
		'hanmail.net',
		'nate.com',
		'live.com'
	),
	remove: null
};
