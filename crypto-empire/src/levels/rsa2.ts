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
import FailReason from "../rules/FailReason";
import RSAAlgorithm from "../rules/information/rsa/RSAAlgorithm";
import {Locations} from "./BuildingBlocks";
import StartOfEachTurnAutoAction from "../rules/autoaction/StartOfEachTurnAutoAction";
import Information from "../rules/information/Information";
import Base64Algorithm from "../rules/information/base64/Base64Algorithm";
import MorseCodeAlgorithm from "../rules/information/morse/MorseCodeAlgorithm";
import DESAlgorithm from "../rules/information/des/DESAlgorithm";
import PlaintextInformation from "../rules/information/PlaintextInformation";

export default class Rsa2 extends LevelDefinition {
    getName(): string {
        return "RSA 2";
    }

    getShortDescription(): string {
        return "Read Alice's message to Bob.";
    }

    loadInto(session: Session, state: State): void {
        let alice = Computer.Alice();
        let bob = Computer.Bob();
        let mallory = Computer.Mallory();
        let frank = Computer.Frank();
        frank.location = Locations.Top;
        alice.tags.push(Tag.Firewall);
        state.computers.push(alice, bob, mallory, frank);


        let {privateKey, publicKey} = RSAAlgorithm.createKeyPairPrivatePublic(state, "Bob's");
        frank.files.push(new Base64Algorithm(state), new MorseCodeAlgorithm(state), new DESAlgorithm(state), new RSAAlgorithm(state), publicKey);

        alice.ai.push(new TimedAutoAction(2, (state) => {
        }));
        alice.ai.push(new StartOfEachTurnAutoAction((self, turn, state) => {
            if ((turn == 2 || turn == 5 || turn == 8) && self.files.length == 0) {
                state.spawnMessage(alice, frank, this.createDownloadRequest(state));
            }
        }));
        alice.ai.push(new MessageReceivedAutoAction((msg, sstate) => {
            if (msg instanceof Key) {
                let plaintext = new PlaintextInformation("From Alice to Bob", "A message", Story.Plaintext, sstate);
                let rsaMessage = RSAInformation.encrypt(plaintext, msg, sstate);
                sstate.findComputer(alice.name).files.push(msg);
                sstate.spawnMessage(alice, bob, rsaMessage);
            }
        }));
        bob.ai.push(new MessageReceivedAutoAction((msg, sstate) => {
            if (msg instanceof RSAInformation) {
                if (msg.privateKey == privateKey.fulltext) {
                    if (msg.plaintext.fulltext == Story.Plaintext) {
                        sstate.fail(FailReason.ReceivedProperData);
                    }
                } else {
                    sstate.fail(FailReason.ReceivedUnexpectedData);
                }
            }
        }));
        frank.ai.push(new MessageReceivedAutoAction((msg, state) => {
            if (msg instanceof PlaintextInformation) {
                if (msg.caption == "Download request") {
                    state.spawnMessage(frank, alice, (state.findComputer(frank.name).files.find(info => info.caption == "Bob's public key") as Information).copy(state));
                }
            }
        }));

        session.winOnReading = Story.Plaintext;
        frank.files.push(new PlaintextInformation("Fileserver protocol", "On download requests", "Connection is often faulty. Therefore, if a download request fails to do anything, the client computer usually soon retries.", state));
    }

    private createDownloadRequest(state: State): PlaintextInformation {
        let downloadRequest = new PlaintextInformation("Download request",
            "RETR Bob's public key",
            `Connected to frank-file-server.example.com
220 Hello. This is the Frank file server system.
USER alice
230 User alice logged in, password not required.
SYST
215 VMS
NOOP
200 The problem with FTP jokes is that everyone can get them.
RETR Bob's public key`, state);
        return downloadRequest;
    }
}