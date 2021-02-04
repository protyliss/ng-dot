export function selectOptionsFromObject<T extends Record<string , any>>(items: T[], keyName: keyof T, valueName: keyof T);
export function selectOptionsFromObject(items, keyName, valueName) {
	return items.map(item => {
		return {
			key  : item[keyName],
			value: item[valueName]
		};
	});
}