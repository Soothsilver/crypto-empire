import Information from "./information/Information";
import {Computer} from "./Computer";
import Envelope from "./information/Envelope";
import {findMidwayPoint} from "../utils/Functions";
import ComputerIcon from "../components/ComputerIcon";
import Message from "../components/Message";
import Mathematics from "../utils/Mathematics";
import Session from "./Session";


export default class State {
    public computers: Computer[] = [];
    public inventory: Information[] = [];
    public messages: Envelope[] = [];
    public session: Session;

    copy(): State {
        let clone = new State();
        clone.session = this.session;
        for (let c of this.computers) {
            clone.computers.push(c.copy());
        }
        for (let m of this.inventory) {
            clone.inventory.push(m.copy(clone));
        }
        for (let m of this.messages) {
            clone.messages.push(m.copy(clone));
        }
        return clone;
    }

    /**
     * This method is called as time is advanced, and it's called in the newly created state.
     * @param time What time step begins. The first click of 'Advance time' will create time step 2.
     */
    stepBegins(time: number) {
        for (let mi = 0; mi < this.messages.length; mi++) {
            let m = this.messages[mi];
            if (m.reachedDestination) {
                this.messages.splice(mi, 1);
                mi--;
                continue;
            }
            m.reachedDestination = true;
            m.location = m.requestedLocation;
            let reclocation = Mathematics.subtract(
                Mathematics.toCenterComputer(m.recipient.location),
                ({x: Message.WIDTH / 2, y: Message.HEIGHT / 2}));
            m.requestedLocation = reclocation;
            m.requestedFadeOut = true;
            m.recipient.acceptEnvelope(m, this);
        }
        for (let c of this.computers) {
            c.stepBegins(this, time);
        }
    }

    spawnMessage(sender: Computer, recipient: Computer, message: Information) {
        let e = new Envelope(sender, recipient, message);
        e.location = Mathematics.subtract(
            Mathematics.toCenterComputer(sender.location),
            ({x: Message.WIDTH / 2, y: Message.HEIGHT / 2}));

        var reclocation = Mathematics.subtract(
            Mathematics.toCenterComputer(recipient.location),
            ({x: Message.WIDTH / 2, y: Message.HEIGHT / 2}));
        e.requestedLocation = findMidwayPoint(e.location, reclocation);
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
}