import {Input} from '@angular/core';

/**
 * worker <select> value
 */
export function optionSelect(node: HTMLSelectElement, value: string);
export function optionSelect(node, value) {
    const {options} = node;
    let current = options.length;
    let option;
    while (current-- > 0) {
        option = options[current];
        option.selected = option.value === value;
    }
}
