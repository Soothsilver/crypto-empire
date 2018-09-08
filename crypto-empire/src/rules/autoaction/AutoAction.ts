import State from "../State";
import {Computer} from "../Computer";
import {AutoActionTriggerKind} from "./AutoActionTriggerKind";

export default abstract class AutoAction {
    trigger : AutoActionTriggerKind;

    constructor(trigger : AutoActionTriggerKind) {
        this.trigger = trigger;
    }
}