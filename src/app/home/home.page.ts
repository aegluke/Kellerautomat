import { Component } from '@angular/core';
import { Automat } from '../models/automat';
import { Transition } from '../models/transition';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  automat: Automat;
  newTransition: Transition = {
    state: 'Z',
    input: '',
    stackTop: '#',
    stateNext: 'Z',
    stackOp: '!'
  }

  /**
   * Validiert die Eingabe gegen das Eingabealphabet und das Kellertopzeichen
   */
  validateInput(event) {
    let result: boolean = (this.automat.alphabetInput.includes(event.key));
    result = result || this.automat.stackEmpty === event.key;
    if (result) {
      event.target.value = '';
    }
    return result;
  }

  /**
   * Validiert gegen das Kelleralphabet und die Operationen
   */
  validateOperation(event) {
    let result: boolean = (this.automat.alphabetStack.includes(event.key));
    result = result || this.automat.opRemove === event.key || this.automat.opNo === event.key;
    if (result) {
      event.target.value = '';
    }
    return result;
  }

  /**
   * Prüft gegen das Kelleralphabet und das Leer-Symbol
   */
  validateStackTop(event) {
    let result: boolean = (this.automat.alphabetStack.includes(event.key));
    result = result || this.automat.stackEmpty === event.key;
    if (result) {
      event.target.value = '';
    }
    return result;
  }

  /**
   * Liefert das Inputalphabet als Char-Array
   */
  getInputArray(): Array<string> {
    return Array.from(this.automat.input);
  }

  /**
   * Liefert das Kelleralphabet als Char-Array
   */
  getStackArray(): Array<string> {
    return Array.from(this.automat.stack);
  }

  emptyAutomat(): Automat {
    return {
      alphabetInput: 'abcde',
      alphabetStack: 'xyz',
      input: 'acddca',
      transitions: [],
      stackEmpty: '#',
      opNo: '!',
      opRemove: '?',
      inputPosition: 0,
      stack: '#'
    };
  }

  /**
   * Liefert das 3=>2-Tupel fuer die Ausgabe
   * @param string transistion der Zustandsuebergang der ausgegeben werden soll
   */
  getTransitionString(transition: Transition): string {
    return '(' + transition.state + ',' +
      transition.input + ',' +
      transition.stackTop +
      ') => (' +
      transition.stateNext + ',' +
      transition.stackOp + ')'
  }

  addTransition(transition: Transition) {
    debugger;
    let data = JSON.parse(JSON.stringify(transition));
    this.automat.transitions.push(data);
    this.automat.transitions.sort((a, b) => {
      let result: number = a.state.localeCompare(b.state);
      if (result === 0) {
        result = a.input.localeCompare(b.input);
      }
      if (result === 0) {
        result = a.stackTop.localeCompare(b.stackTop);
      }
      return result;
    });
  }

  /**
   * Prueft ob ein Uebergang korrekt erfasst wurde. Falls nicht, wird eine entsprechende Fehlermeldung zurueckgegeben
   * @param Transition transition Uebergang der geprueft werden soll. 
   */
  checkTransition(transition: Transition): string {
    let result = '';
    if (transition.state === '') {
      result = 'Der Startzustand darf nicht leer sein.<br>';
    }
    if (transition.input === '') {
      result = result + 'Das Eingabezeichen darf nicht leer sein.<br>';
    }
    if (transition.stackTop === '') {
      result = result + 'Das Kellertopzeichen darf nicht leer sein<br>';
    }
    if (transition.stateNext === '') {
      result = result + 'Der Zielzustand darf nicht leerein.<br>';
    }
    if (transition.stackOp === '') {
      result = result + 'Die Kelleroperation darf nicht leer sein<br>';
    }
    return result;
  }

  /**
   * Gibt es bereits einen Zustandsuebergang mit einer solchen Startkonfiguration?
   * @param Transition transition 
   * @return number -1, wenn es einen solchen Zustand nicht gibt
   */
  indexOfTransition(transition: Transition): number {
    let result = -1;
    let pos = -1;
    this.automat.transitions.forEach(trans => {
      pos++;
      if (transition.input === trans.input && transition.stackTop === trans.stackTop && transition.state === trans.state) {
        result = pos;
        return;
      }
    });
    return result;
  }

  openTransition(transition: Transition) {
    this.newTransition = transition;
  }

  /**
   * Fuegt den aktuell bearbeiteten Eintrag hinzu
   */
  addEntry() {
    const checkmessage = this.checkTransition(this.newTransition);
    if (checkmessage === '') {
      if (this.indexOfTransition(this.newTransition) > -1) {
        this.alertCtrl.create({
          header: 'Doppelte Ausgangskonfiguration',
          message: 'Es existiert bereits ein Zustandsübergang mit dieser Ausgangssituation - Diesen Zustandsübergang ersetzen?',
          buttons: ['Ersetzen', 'Abbrechen']
          // TODO: Handler implementieren
        }).then(
          (alert) => alert.present()
        );
      } else {
        this.addTransition(this.newTransition);
      }
    } else {
      this.alertCtrl.create({
        message: checkmessage,
        header: 'Fehler',
        buttons: ['Ok']
      }).then((alert) => {
        alert.present();
      });
    }
  }

  constructor(public alertCtrl: AlertController) {
    this.automat = this.emptyAutomat();
  }

}
