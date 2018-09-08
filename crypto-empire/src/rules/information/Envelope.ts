import Information from "./Information";
import Point from "../Point";
import {Computer} from "../Computer";
import State from "../State";

export default class Envelope {
    recipient: Computer;
    sender: Computer;
    message: Information;
    location: Point;
    requestedLocation: Point;
    reachedDestination: boolean;
    requestedFadeOut: boolean;

    constructor(sender : Computer, recipient: Computer, message: Information) {
        this.message = message;
        this.sender = sender;
        this.recipient = recipient;
    }

    copy(newstate : State) : Envelope {
        let e = new Envelope(newstate.findComputer(this.sender.name), newstate.findComputer(this.recipient.name), this.message.copy(newstate));
        e.location = this.location;
        e.requestedLocation = this.location;
        e.reachedDestination = this.reachedDestination;
        e.requestedFadeOut = this.requestedFadeOut;
        return e;
    }
}