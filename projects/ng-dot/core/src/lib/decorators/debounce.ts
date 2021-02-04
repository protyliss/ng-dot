export function Debounce(time_or_propertyName: number | string = 240) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const origin = descriptor.value;
		const key = '_' + propertyKey + '_debounceTimer';

		descriptor.value = typeof time_or_propertyName === 'number' ?
			function (...args: any[]) {
				const timer = this[key];

				if (timer) {
					clearTimeout(timer);
				}

				this[key] = setTimeout(() => {
					origin.apply(this, args);
				}, time_or_propertyName);
			} :
			function (...args: any[]) {
				const timer = this[key];

				if (timer) {
					clearTimeout(timer);
				}

				this[key] = setTimeout(() => {
					origin.apply(this, args);
				}, this[time_or_propertyName]);
			};
	};
}