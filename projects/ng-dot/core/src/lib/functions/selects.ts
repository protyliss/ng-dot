import {QueryList} from '@angular/core';
import {HasInvert, HasSelect, HasUnselect} from '../interfaces/selectable-interface';
import {SelectorsContainerInterface} from '../interfaces/selectors-container-interface';

export function selectsAll<T extends QueryList<SelectorsContainerInterface>>(containers: T);
export function selectsAll<T extends Array<SelectorsContainerInterface>>(containers: T) {
	containers.forEach(selectsAllEachFunction);
}

export function selectsAllEachFunction(container: SelectorsContainerInterface) {
	container.selectAll();
}

export function unselectsAll<T extends QueryList<SelectorsContainerInterface>>(containers: T);
export function unselectsAll<T extends Array<SelectorsContainerInterface>>(containers: T) {
	containers.forEach(unselectsAllEachFunction);
}

export function unselectsAllEachFunction(container: SelectorsContainerInterface) {
	container.unselectAll();
}

export function invertsAll<T extends QueryList<SelectorsContainerInterface>>(containers: T);
export function invertsAll<T extends Array<SelectorsContainerInterface>>(containers: T) {
	containers.forEach(invertsAllEachFunction);
}

export function invertsAllEachFunction(container: SelectorsContainerInterface) {
	container.invertAll();
}


export function selectAll<T extends HasSelect>(containers: T[]) {
	containers.forEach(selectAllEachFunction);
}

export function selectAllEachFunction(container: HasSelect) {
	container.select();
}

export function unselectAll<T extends HasUnselect>(containers: T[]) {
	containers.forEach(unselectAllEachFunction);
}

export function unselectAllEachFunction(container: HasUnselect) {
	container.unselect();
}

export function invertAll<T extends HasInvert>(containers: T[]) {
	containers.forEach(invertAllEachFunction);
}

export function invertAllEachFunction(container: HasInvert) {
	container.invert();
}