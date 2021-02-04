import {FormControlInterface} from './form-control-interface';
import {FormControlType} from './form-control-type';
import {FormScriptInterface} from './form-script-interface';

//////////////////////////////
// FORM OPERATOR
export type FormPropertyOperator = (...args: any[]) => FormPropertyOperatorFunction;

export type FormPropertyOperatorFunction = <T extends FormScriptInterface>(form: T) => T;

export type FormTypeOperator<TYPE extends FormControlType> = (name: string, ...args: any[]) => FormTypeOperatorFunction<TYPE>;

export type FormTypeOperatorFunction<TYPE extends FormControlType> = <T extends FormScriptInterface>(form: T) => FormControlInterface;

//////////////////////////////
// CONTROL OPERATOR

export type FormControlOperator = (...args: any[]) => FormControlOperatorFunction;

export type FormControlOperatorFunction = <T extends FormControlInterface>(control: T) => T;