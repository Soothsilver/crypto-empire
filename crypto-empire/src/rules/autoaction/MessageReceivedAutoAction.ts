import AutoAction from "./AutoAction";
import Information from "../information/Information";
import {AutoActionTriggerKind} from "./AutoActionTriggerKind";

export default class MessageReceivedAutoAction extends AutoAction {
    action: (message: Information) => void;

    constructor(action: (message : Information) => void) {
        super(AutoActionTriggerKind.MessageReceived);
        this.action = action;
    }
}