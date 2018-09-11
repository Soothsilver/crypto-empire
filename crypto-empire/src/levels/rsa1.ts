import LevelDefinition from "./LevelDefinition";
import Session from "../rules/Session";
import State from "../rules/State";
import {Computer} from "../rules/Computer";
import Key from "../rules/information/Key";
import {TimedAutoAction} from "../rules/autoaction/TimedAutoAction";
import {Tag} from "../rules/Tag";
import MessageReceivedAutoAction from "../rules/autoaction/MessageReceivedAutoAction";
import {Story} from "./Story";
import RSAInformation from "../rules/information/rsa/RSAInformation";
import PlaintextInformation from "../rules/information/PlaintextInformation";
import FailReason from "../rules/FailReason";
import RSAAlgorithm from "../rules/information/rsa/RSAAlgorithm";

export default class Rsa1 extends LevelDefinition {
    getName(): string {
        return "RSA";
    }

    getShortDescription(): string {
        return "An asymmetric cipher";
    }

    loadInto(session: Session, state: State): void {
        let alice = Computer.Alice();
        let bob = Computer.Bob();
        let mallory = Computer.Mallory();
        alice.tags.push(Tag.Firewall);
        state.computers.push(alice, bob, mallory);


        let { privateKey, publicKey } = RSAAlgorithm.createKeyPairPrivatePublic(state, "Bob's");

        bob.ai.push(new TimedAutoAction(2, (sstate)=>{
            sstate.spawnMessage(bob, alice, publicKey.copy(sstate));
        }));
        alice.ai.push(new MessageReceivedAutoAction((msg, sstate)=>{
            if (msg instanceof Key) {
                let plaintext = new PlaintextInformation("From Alice to Bob", "A message", Story.Plaintext, sstate);
                let rsaMessage = RSAInformation.encrypt(plaintext, publicKey, sstate);
                sstate.spawnMessage(alice, bob, rsaMessage);
            }
        }));
        bob.ai.push(new MessageReceivedAutoAction((msg,sstate)=>{
            if (msg instanceof RSAInformation) {
                if (msg.privateKey == privateKey.fulltext) {
                    if (msg.plaintext.fulltext == Story.Plaintext) {
                        sstate.fail(FailReason.ReceivedProperData);
                    } else if (msg.plaintext.fulltext == Story.FakePlaintext) {
                        session.won = true;
                    }
                } else {
                    sstate.fail(FailReason.ReceivedUnexpectedData);
                }
            }
        }));

        state.inventory.push(new PlaintextInformation("Fake message", "Send this to Bob", Story.FakePlaintext, state));
        state.inventory.push(new RSAAlgorithm(state));
        session.minimumVictoryTurn = 4;
        session.objectives = `Replace Alice's message with your own.`;
    }
}