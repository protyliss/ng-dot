/**
 * get <select> value
 */
export function optionValue(node: HTMLSelectElement): string;
export function optionValue(node) {
    const option = node.options[node.selectedIndex];
    return option ?
        option.value :
        undefined;
}
