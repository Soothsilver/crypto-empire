import {Computer} from "../rules/Computer";
import State from "../rules/State";
import Session from "../rules/Session";
import LevelDefinition from "./LevelDefinition";
import PlaintextInformation from "../rules/information/PlaintextInformation";
import {Story} from "./Story";
import DESAlgorithm from "../rules/information/des/DESAlgorithm";
import Key from "../rules/information/Key";
import {Tag} from "../rules/Tag";
import Virus from "../rules/information/Virus";
import {TimedAutoAction} from "../rules/autoaction/TimedAutoAction";
import DESInformation from "../rules/information/des/DESInformation";
import ArchiveInformation from "../rules/information/archive/ArchiveInformation";
import Archiver from "../rules/information/archive/Archiver";
import MessageReceivedAutoAction from "../rules/autoaction/MessageReceivedAutoAction";
import FailReason from "../rules/FailReason";
import {instanceOf} from "prop-types";
import Information from "../rules/information/Information";


export default class FirstTrent extends LevelDefinition {
    getName(): string {
        return "Trent";
    }

    getShortDescription(): string {
        return "Can you depend on a trusted arbitrator?"
    }

    loadInto(session: Session, state: State): void {
        let alice = Computer.Alice();
        let bob = Computer.Bob();
        let frank = Computer.Frank();
        let trent = Computer.Trent();
        let mallory = Computer.Mallory();
        frank.files.push(new DESAlgorithm(state), new Key("Abandoned key", "A random string of numbers", state, "5614527426411454233143231543241421"),
            new Virus(state), new Archiver(state));
        trent.tags = [ Tag.Trusted ];
        let aliceKey = new Key("Alice's key", "Shared by Trent and Alice", state, "5h57d4v435f1hf1d4gv5fd21gv14g2h1fg.4h2b21fg1g974cb4gh36m5jk5131s");
        let bobKey = new Key("Bob's key", "Shared by Trent and Bob", state,       "6o145k34f5aa4gc3gj2456k234234263hn4l3bbv5yt87y3562v2b34h2b21fg1g");
        let certificationAlice = new PlaintextInformation("Certification", "By Alice", "I, Trent, hereby certify that it was Alice who sent this message.", state);
        let certificationBob = new PlaintextInformation("Certification", "By Bob", "I, Trent, hereby certify that it was Bob who sent this message.", state);
        trent.files.push(aliceKey);
        trent.files.push(bobKey);

        alice.ai.push(new TimedAutoAction(2, (state) => {
            let plaintext = new PlaintextInformation("For Bob", "Please listen", Story.Plaintext, state);
            let targetinformation = new PlaintextInformation("Recipient: Bob", "Delivery instructions", "This instructs the Trusted Authority to deliver this message to the computer identified in the caption.", state);
            let archive = new ArchiveInformation("Alice to Bob", state, plaintext, targetinformation);
            let aliceArchiveEncrypted = new DESInformation(archive, aliceKey.fulltext, state);
            state.spawnMessage(alice, trent, aliceArchiveEncrypted);
        }));

        trent.ai.push(new MessageReceivedAutoAction((msg,state)=> {
            if (!(msg instanceof DESInformation)) {
                return;
            }
            let self = state.findComputer(trent.name);
            for (let key of self.files.filter(file => file instanceof Key)) {
                let kkey = key as Key;
                if (msg.key != kkey.fulltext) {
                    continue;
                }
                let archive = msg.plaintext;
                if (!(archive instanceof ArchiveInformation) || archive.archivedInformation.length != 2) {
                    return;
                }
                let message : Information = archive.archivedInformation[0];
                let delivery : Information = archive.archivedInformation[1];
                if (!(delivery instanceof PlaintextInformation) || !delivery.caption.startsWith("Recipient: ")) {
                    return;
                }
                let recipientName = delivery.caption.substring("Recipient: ".length);
                let targetComputer : Computer | undefined = state.computers.find(comp => comp.name == recipientName);
                let certification: Information | undefined = undefined;
                let encryptionKey: string | undefined = undefined;
                if (recipientName == "Bob") encryptionKey = bobKey.fulltext;
                if (recipientName == "Alice") encryptionKey = aliceKey.fulltext;
                if (key.caption == "Alice's key") certification = certificationAlice;
                if (key.caption == "Bob's key") certification = certificationBob;
                if (targetComputer != undefined && certification != undefined && encryptionKey != undefined) {
                    let newArchive = new ArchiveInformation("Certified message", state, message.copy(state), certification.copy(state));
                    let encryptedNewArchive = new DESInformation(newArchive, encryptionKey, state);
                    state.spawnMessage(trent, targetComputer, encryptedNewArchive);
                }
            }
        }));


        bob.ai.push(new MessageReceivedAutoAction((msg,state)=>{
            if (msg instanceof DESInformation) {
                if (msg.key == bobKey.fulltext) {
                    let decrypted = msg.plaintext;
                    if (decrypted instanceof ArchiveInformation) {
                        let unarchived = decrypted.archivedInformation;
                        if (unarchived.length != 2) {
                            state.fail(FailReason.ReceivedUnexpectedData);
                            return;
                        }
                        let plaintext = unarchived[0];
                        let certification = unarchived[1];
                        if (certification.subcaption != certificationAlice.subcaption) {
                            state.fail(FailReason.ReceivedUnexpectedData);
                            return;
                        }
                        if (plaintext instanceof PlaintextInformation) {
                            if (plaintext.fulltext == Story.Plaintext) {
                                state.fail(FailReason.ReceivedProperData);
                            } else if (plaintext.fulltext == Story.FakePlaintext) {
                                session.won = true;
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
            }
        }));


        state.computers.push(alice, bob, frank, trent, mallory);
        session.objectives = `Replace Alice's message with yours.`;
        state.inventory.push(new PlaintextInformation("Fake message", "For Bob", Story.FakePlaintext, state));
    }
}