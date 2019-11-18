import { Transition } from './transition';

export interface Automat {
    // Kellerleersymbol
    stackEmpty: string;
    // Keine Operation - Zeichen
    opNo: string;
    // Pop-Operation
    opRemove: string;
    // Kelleralphabet
    alphabetStack: string;
    // Eingabealphabet
    alphabetInput: string;
    // Eingabe
    inputStart: string;
    // Keller
    stack: string;
    // Startstatus
    stateStart: string;
    // Liste der Zustandsuebergange
    transitions: Transition[];
    state: {
        // aktueller Stack
        stack: string;
        // Das Ausfuehrungsprotokoll
        protocol: Transition[];
        // die Eingabe die gerade verarbeitet wird
        input: string;
        // aktuelle Position in der Eingabe
        inputPosition: number;
        // Zustand
        activeState: string;
    }
}
