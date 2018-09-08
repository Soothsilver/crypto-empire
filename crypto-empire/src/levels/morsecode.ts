import LevelDefinition from "./LevelDefinition";
import Session from "../rules/Session";
import State from "../rules/State";
import {Computer} from "../rules/Computer";

export default class MorseCode extends LevelDefinition {
    loadInto(session: Session, s : State): void {
        let alice = Computer.Alice();
        let bob = Computer.Bob();
        let frank = Computer.Frank();
        s.computers.push(alice, bob, frank);
    }

    getName(): string {
        return "Morse code";
    }

    getShortDescription(): string {
        return "Silly Alice, you must use codes!";
    }
}