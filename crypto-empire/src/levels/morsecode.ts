import LevelDefinition from "./LevelDefinition";
import Session from "../rules/Session";
import State from "../rules/State";
import {Computer} from "../rules/Computer";
import StartOfEachTurnAutoAction from "../rules/autoaction/StartOfEachTurnAutoAction";
import PlaintextInformation from "../rules/information/PlaintextInformation";
import {Story} from "./Story";
import MorseCodeAlgorithm from "../rules/information/morse/MorseCodeAlgorithm";
import Base64Algorithm from "../rules/information/base64/Base64Algorithm";
import MorseCodeInformation from "../rules/information/morse/MorseCodeInformation";
import Base64Information from "../rules/information/base64/Base64Information";

export default class MorseCode extends LevelDefinition {
    loadInto(session: Session, s : State): void {
        let alice = Computer.Alice();
        let bob = Computer.Bob();
        let frank = Computer.Frank();
        frank.files.push(new MorseCodeAlgorithm(s));
        frank.files.push(new Base64Algorithm(s));
        bob.ai.push(new StartOfEachTurnAutoAction((self, time, state)=>{
            if (time == 2) {
                let plaintext = new PlaintextInformation("For Alice", "Executed", Story.BobToAlice2, state);
                let morseCodeInformation = new MorseCodeInformation(plaintext, state);
                state.spawnMessage(bob, alice, new Base64Information(morseCodeInformation, state));
            }
        }));
        s.computers.push(alice, bob, frank);
        session.winOnReading = Story.BobToAlice2;
    }

    getName(): string {
        return "Morse code";
    }

    getShortDescription(): string {
        return "Silly Alice, you must use codes!";
    }
}