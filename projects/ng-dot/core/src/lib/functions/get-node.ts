export function getNode<T extends {nativeElement: any} | any>(element) {
	if (element['nativeElement']) {
		return element['nativeElement'];
	}
	return element;
}
