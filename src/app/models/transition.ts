export interface Transition {
    state: string,
    input: string,
    stackTop: string,
    stateNext: string,
    stackOp: string
}
