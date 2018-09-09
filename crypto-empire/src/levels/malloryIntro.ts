import LevelDefinition from "./LevelDefinition";
import Session from "../rules/Session";
import State from "../rules/State";
import {Computer} from "../rules/Computer";
import PlaintextInformation from "../rules/information/PlaintextInformation";
import DESAlgorithm from "../rules/information/des/DESAlgorithm";
import Base64Algorithm from "../rules/information/base64/Base64Algorithm";
import {TimedAutoAction} from "../rules/autoaction/TimedAutoAction";
import Key from "../rules/information/Key";
import DESInformation from "../rules/information/des/DESInformation";
import {Story} from "./Story";
import MessageReceivedAutoAction from "../rules/autoaction/MessageReceivedAutoAction";
import FailReason from "../rules/FailReason";
import NextTurnAutoAction from "../rules/autoaction/NextTurnAutoAction";

export default class MalloryIntro extends LevelDefinition {
    getName(): string {
        return "Mallory";
    }

    getShortDescription(): string {
        return "Replace Bob's message with your own.";
    }

    loadInto(session: Session, state: State): void {
        let alice = Computer.Alice();
        let bob = Computer.Bob();
        let mallory = Computer.Mallory();
        let chuck = Computer.Headquarters();

        state.computers.push(alice, bob, mallory, chuck);
        state.inventory.push(new PlaintextInformation("Your mission", "TOP SECRET//ORCON",
`Your objectives:
1. Do not let Bob's true message reach Alice.
2. Instead, give the true message to Headquarters.
3. We will then give you a replacement message.
4. Ensure that Alice receives it.
`, state), new DESAlgorithm(state), new Base64Algorithm(state));
        session.objectives =
`1. Read the plaintext message.
2. Replace the plaintext message with a forgery from Headquarters.`;
        let DES_KEY = "nmd5df53sgd5sf432g5sd4gdgsdfg56d43vd5sfg";

        bob.ai.push(new TimedAutoAction(2, (state)=>{
            state.spawnMessage(bob, alice, new Key("DES key", "Decrypt using this, Alice.", state, DES_KEY));
        }));
        bob.ai.push(new TimedAutoAction(4, (state)=>{
            // TODO this should be 3, but for some reason (React...) that makes the message disappear
            let ascii = new PlaintextInformation("Meeting plan", "Be there, or else.", Story.BobToAlice4, state);
            state.spawnMessage(bob, alice, new DESInformation(ascii, DES_KEY, state));
        }));

        alice.ai.push(new MessageReceivedAutoAction((message, state) => {
            let nalice = state.findComputer(alice.name);
            if (message instanceof Key) {
                if (nalice.files.length != 0) {
                    state.fail(FailReason.ReceivedUnexpectedData);
                } else {
                    nalice.files.push(message);
                }
            } else if (message instanceof DESInformation) {
                if (nalice.files.length == 1) {
                    let alicesKey = nalice.files[0] as Key;
                    if (message.key == alicesKey.fulltext) {
                        if (message.plaintext.fulltext == Story.BobToAlice4) {
                            state.fail(FailReason.ReceivedProperData);
                        } else if (message.plaintext.fulltext == Story.BobToAlice4Fake) {
                            session.won = true;
                        } else {
                            nalice.files.push(message);
                        }
                    } else {
                        state.fail(FailReason.ReceivedUnexpectedData);
                    }
                } else {
                    state.fail(FailReason.ReceivedUnexpectedData);
                }
            } else {
                state.fail(FailReason.ReceivedUnexpectedData);
            }
        }));

        chuck.ai.push(new MessageReceivedAutoAction((msg, state)=>{
            if (msg instanceof PlaintextInformation && msg.fulltext == Story.BobToAlice4) {
                chuck.ai.push(new NextTurnAutoAction((state2) => {
                    state2.spawnMessage(chuck, mallory, new PlaintextInformation("Meeting plan (forged)", "Be there, or else.", Story.BobToAlice4Fake, state2));
                }));
            }
        }));
    }

}