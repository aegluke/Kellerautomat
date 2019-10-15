import { Component } from '@angular/core';
import { Automat } from '../models/automat';
import { Transition } from '../models/transition';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  automat: Automat;
  newTransition : Transition = {
    state: 'Z',
    input: '',
    stackTop: '#',
    stateNext: 'Z',
    stackOp: '!'
  }


  /**
   * Validiert die Eingabe gegen das Eingabealphabet und das Kellertopzeichen
   * @param event 
   */
  validateInput(event) {
     let result : boolean = (this.automat.alphabetInput.includes( event.key ));
     result = result || this.automat.stackEmpty == event.key;
     if (result) {
       event.target.value = '';
     }
     return result;
  }

  /**
   * Validiert gegen das Kelleralphabet und die Operationen
   * @param event 
   */
  validateOperation(event) {
    let result : boolean =  (this.automat.alphabetStack.includes( event.key ));
    result = result || this.automat.opRemove==event.key || this.automat.opNo == event.key;
    if (result) {
      event.target.value = '';
    }
    return result;
  }
  
  /**
   * Prüft gegen das Kelleralphabet und das Leer-Symbol
   * @param event 
   */
  validateStackTop(event) {
    let result : boolean = (this.automat.alphabetStack.includes( event.key ));
    result =  result || this.automat.stackEmpty == event.key;
    if (result) {
      event.target.value = '';
    }
    return result;
  }

  getInputArray() {
    return Array.from(this.automat.input);
  }

  getStackArray() {
    return Array.from(this.automat.stack);
  }

  emptyAutomat() : Automat {
    return  { alphabetInput: 'abcde', alphabetStack: 'xyz', input: 'acddca', transitions: [], stackEmpty: '#', opNo: "!", opRemove: '?', inputPosition: 0, stack: '#' }; 
  }

  getTransitionString(transition: Transition) {
    let start : string = '('+transition.state+','+transition.input+','+transition.stackTop+') => (' + transition.stateNext + ',' + transition.stackOp + ')';
    return start;
  }

  addTransition(transition: Transition) {
    let data = JSON.parse(JSON.stringify(transition));
    this.automat.transitions.push(data);
    this.automat.transitions.sort((a,b)=>{
      let result: number = a.state.localeCompare(b.state);
      if (result==0) {
        result = a.input.localeCompare(b.input);
      }
      if (result==0) {
        result = a.stackTop.localeCompare(b.stackTop);
      }
      return result;
    });
  }

  checkTransition(transitiion: Transition) {
    return true;
  }

  openTransition(transition: Transition) { 
    this.newTransition = transition;
  }

  addEntry()  {
    if (this.checkTransition(this.newTransition)) {
      this.addTransition(this.newTransition);
    } else {

    }
  }

  constructor() {
    this.automat = this.emptyAutomat();
  }

}
