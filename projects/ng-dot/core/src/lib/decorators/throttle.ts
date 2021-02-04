export function Throttle(time_or_propertyName: number | string = 240) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const origin = descriptor.value;
		const key = '_' + propertyKey + '_throttleTimer';
		
		descriptor.value = typeof time_or_propertyName === 'number' ?
			function (...args: any[]) {
				if (!this[key]) {
					setTimeout(() => {
						origin.apply(this, this[key]);
						delete this[key];
					}, time_or_propertyName);
				}

				this[key] = args;
			} :
			function (...args: any[]) {
				if (!this[key]) {
					setTimeout(() => {
						origin.apply(this, this[key]);
						delete this[key];
					}, this[time_or_propertyName]);
				}
				
				this[key] = args;
			};
	};
}
