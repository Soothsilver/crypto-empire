import Information from "./information/Information";
import {Computer} from "./Computer";
import Envelope from "./information/Envelope";
import {findMidwayPoint} from "../utils/Functions";
import Message from "../components/Message";
import Mathematics from "../utils/Mathematics";
import Session from "./Session";
import {Tag} from "./Tag";


export default class State {
    public computers: Computer[] = [];
    public inventory: Information[] = [];
    public messages: Envelope[] = [];
    public session: Session;
    public lossReason: string;
    public lost: boolean;

    copy(): State {
        let clone = new State();
        clone.session = this.session;
        for (let c of this.computers) {
            clone.computers.push(c.copy(clone));
        }
        for (let m of this.inventory) {
            clone.inventory.push(m.copy(clone));
        }
        for (let m of this.messages) {
            clone.messages.push(m.copy(clone));
        }
        clone.lossReason = this.lossReason;
        clone.lost = this.lost;
        return clone;
    }

    /**
     * This method is called as time is advanced, and it's called in the newly created state.
     * @param time What time step begins. The first click of 'Advance time' will create time step 2.
     */
    stepBegins(time: number) {
        let currentMessagesLength = this.messages.length;
        for (let mi = 0; mi < currentMessagesLength; mi++) {
            let m = this.messages[mi];
            if (m.ceasedToExist) {
                continue;
            }
            if (m.reachedDestination) {
                m.ceasedToExist = true;
                continue;
            }
            m.reachedDestination = true;
            m.location = m.requestedLocation;
            m.requestedLocation = Mathematics.subtract(
                Mathematics.toCenterComputer(m.recipient.location),
                ({x: Message.WIDTH / 2, y: Message.HEIGHT / 2}));
            m.requestedFadeOut = true;
            m.recipient.acceptEnvelope(m, this);
        }
        for (let c of this.computers) {
            c.stepBegins(this, time);
        }
    }

    spawnMessage(sender: Computer, recipient: Computer, message: Information) {
        sender = this.findComputer(sender.name);
        recipient = this.findComputer(recipient.name);

        let e = new Envelope(sender, recipient, message);
        message.local = false;
        e.location = Mathematics.subtract(
            Mathematics.toCenterComputer(sender.location),
            ({x: Message.WIDTH / 2, y: Message.HEIGHT / 2}));

        const recipientLocation = Mathematics.subtract(
            Mathematics.toCenterComputer(recipient.location),
            ({x: Message.WIDTH / 2, y: Message.HEIGHT / 2}));
        e.requestedLocation = findMidwayPoint(e.location, recipientLocation);
        this.messages.push(e);
    }

    findComputer(name: string): Computer {
        for (let c of this.computers) {
            if (c.name == name) {
                return c;
            }
        }
        throw "No computer with that name exists.";
    }

    download(f: Information): void {
        let aCopy = f.copy(f.state);
        aCopy.local = true;
        this.inventory.push(aCopy);
    }

    createInformation(f: Information): void {
        f.local = true;
        this.inventory.push(f);
    }

    fail(failReason: string) {
        this.lost = true;
        this.lossReason = failReason;
    }

    you() : Computer | undefined {
        for (let computer of this.computers) {
            if (computer.tags.includes(Tag.You)) {
                return computer;
            }
        }
        return undefined;
    }

    destroyMessage(information: Information): void {
        for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].message == information) {
                this.messages[i].ceasedToExist = true;
                return;
            }
        }
    }
}