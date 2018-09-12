import LevelDefinition from "./LevelDefinition";
import Session from "../rules/Session";
import State from "../rules/State";
import {Computer} from "../rules/Computer";
import Key from "../rules/information/Key";
import {TimedAutoAction} from "../rules/autoaction/TimedAutoAction";
import {Tag} from "../rules/Tag";
import MessageReceivedAutoAction from "../rules/autoaction/MessageReceivedAutoAction";
import {Story} from "./Story";
import {Locations} from "./BuildingBlocks";
import PlaintextInformation from "../rules/information/PlaintextInformation";
import DESInformation from "../rules/information/des/DESInformation";
import NextTurnAutoAction from "../rules/autoaction/NextTurnAutoAction";
import RSAAlgorithm from "../rules/information/rsa/RSAAlgorithm";
import MorseCodeAlgorithm from "../rules/information/morse/MorseCodeAlgorithm";
import Base64Algorithm from "../rules/information/base64/Base64Algorithm";
import DESAlgorithm from "../rules/information/des/DESAlgorithm";

export default class Trash extends LevelDefinition {
    getName(): string {
        return "Trash";
    }

    getShortDescription(): string {
        return "Don't be careless.";
    }

    loadInto(session: Session, state: State): void {
        let alice = Computer.Alice();
        let bob = Computer.Bob();
        let mallory = Computer.Mallory();
        let trash = new Computer("Trash", [Tag.Secure], Locations.Bottomleft);
        let frank = Computer.Frank();
        state.computers.push(alice, bob, mallory, frank, trash);
        let {privateKey, publicKey} = RSAAlgorithm.createKeyPairPrivatePublic(state, "Bob's");
        frank.files.push(new MorseCodeAlgorithm(state), new Base64Algorithm(state), new DESAlgorithm(state), new RSAAlgorithm(state), publicKey);

        let dkey = new Key("DES key", "Shared by Alice and Bob", state, "354df1g4d2sfgds4f2g4dfgfg4h52h4g1d3fgfg");
        alice.files.push(dkey.copy(state));
        bob.files.push(dkey.copy(state));
        alice.ai.push(new TimedAutoAction(2, (state) => {
            let plaintext = new PlaintextInformation("Secret message", "For Bob", Story.Plaintext, state);
            let destext = new DESInformation(plaintext, dkey.fulltext, state);
            state.spawnMessage(alice, bob, destext);
        }));
        alice.ai.push(new MessageReceivedAutoAction((msg, state) => {
            if (msg instanceof DESInformation) {
                if (msg.key == dkey.fulltext) {
                    if (msg.plaintext.fulltext.includes("You can now dispose of the key")) {
                        state.findComputer(alice.name).ai.push(new NextTurnAutoAction((state) => {
                            state.spawnMessage(alice, trash, dkey.copy(state));
                        }));
                    }
                }
            }
        }));
        bob.ai.push(new MessageReceivedAutoAction((msg, state) => {
            if (msg instanceof DESInformation) {
                if (msg.key == dkey.fulltext) {
                    if (msg.plaintext.fulltext == Story.Plaintext) {
                        let plaintext = new PlaintextInformation("Acknowledgment", "For Alice", `Dear Alice,
thank you for your message.
You can now dispose of the key. This is the last message using it.

Bob`, state);
                        let destext = new DESInformation(plaintext, dkey.fulltext, state);
                        state.spawnMessage(bob, alice, destext);
                    }
                }
            }
        }));

        session.winOnReading = Story.Plaintext;
    }
}