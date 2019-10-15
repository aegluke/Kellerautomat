import { Transition } from './transition';

export interface Automat {
    stackEmpty: string,
    opNo: string,
    opRemove: string,
    alphabetStack: string,
    alphabetInput: string,
    input: string,
    stack: string,
    inputPosition: number,
    transitions: Transition[]
}
