import {ElementRef, Injectable} from '@angular/core';
import {getNode}                from '../functions/get-node';

@Injectable({
  providedIn: 'root'
})
export class DotStyleService {

  set(element: ElementRef | HTMLElement, property: keyof CSSStyleDeclaration, value: string | number);
  set(node, property, value) {
    node = getNode(node);
    node.style[property] = value;
  }

  protected _transform(element: HTMLElement, method: string, ...values: any[]);
  protected _transform(node, method, ...values) {
    node = getNode(node);
    
    const {style} = node;

    let value = `${method}(${values.join(', ')})`;

    if (style.transform) {
      value += ' ' + style.transform.replace(new RegExp(`${method}[^(]*\\([^)]*\\)`), '');
    }

    return this.set(node, 'transform', value);
  }

  scale(element: ElementRef | HTMLElement, value: string | number);
  scale(node, value) {
    value = Math.round(value * 100) / 100;
    return this._transform(node, 'scale', value);
  }

  translate(node, x: string | number, y: string | number);
  translate(node, x, y) {
    if (typeof x === 'number') {
      x = x + 'px';
    }

    if (typeof y === 'number') {
      y = y + 'px';
    }

    return this._transform(node, 'translate', x, y);
  }
}