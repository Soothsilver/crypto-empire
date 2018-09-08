import LevelDefinition from "./LevelDefinition";
import Session from "../rules/Session";
import State from "../rules/State";
import {Computer} from "../rules/Computer";
import StartOfEachTurnAutoAction from "../rules/autoaction/StartOfEachTurnAutoAction";
import PlaintextInformation from "../rules/information/PlaintextInformation";
import {Story} from "./Story";
import MorseCodeAlgorithm from "../rules/information/morse/MorseCodeAlgorithm";
import Base64Algorithm from "../rules/information/base64/Base64Algorithm";
import Base64Information from "../rules/information/base64/Base64Information";
import DESAlgorithm from "../rules/information/des/DESAlgorithm";
import DESInformation from "../rules/information/des/DESInformation";
import Key from "../rules/information/Key";

export default class SymmetricLevel extends LevelDefinition {
    loadInto(session: Session, s: State): void {
        let alice = Computer.Alice();
        let bob = Computer.Bob();
        let frank = Computer.Frank();
        frank.files.push(new MorseCodeAlgorithm(s));
        frank.files.push(new Base64Algorithm(s));
        frank.files.push(new DESAlgorithm(s));
        alice.ai.push(new StartOfEachTurnAutoAction((self, time, state) => {
            if (time == 2) {
                let plaintext = new PlaintextInformation("Protocol instructions", "For Bob only", `I will send you two messages after this one:
<ul><li>First, the DES key for the second message</li><li>Second, the actual message</li></ul>
You can discard the DES key after you use it, Bob, I don't think I'll be using it again.`, state);
                state.spawnMessage(alice, bob, plaintext);
            }
            if (time == 4) {
                let key = new Key("DES key", "Don't give this to anyone", state, "Joshua");
                state.spawnMessage(alice, bob, new Base64Information(key, state));
            }
            if (time == 6) {
                let plaintext = new PlaintextInformation("For Bob", "Third story", Story.AliceToBob3, state);
                let des = new DESInformation(plaintext, "Joshua", state);
                state.spawnMessage(alice, bob, new Base64Information(des, state));
            }
        }));
        s.computers.push(alice, bob, frank);
        session.winOnReading = Story.AliceToBob3;
    }

    getName(): string {
        return "Symmetric encryption";
    }

    getShortDescription(): string {
        return "All good security must rely on a key.";
    }
}