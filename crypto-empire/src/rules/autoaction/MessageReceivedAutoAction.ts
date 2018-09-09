import AutoAction from "./AutoAction";
import Information from "../information/Information";
import {AutoActionTriggerKind} from "./AutoActionTriggerKind";
import State from "../State";

export default class MessageReceivedAutoAction extends AutoAction {
    action: (message: Information, state : State) => void;

    constructor(action: (message : Information, state : State) => void) {
        super(AutoActionTriggerKind.MessageReceived);
        this.action = action;
    }
}