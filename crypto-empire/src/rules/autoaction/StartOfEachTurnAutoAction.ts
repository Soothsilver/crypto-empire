import AutoAction from "./AutoAction";
import State from "../State";
import {Computer} from "../Computer";
import {AutoActionTriggerKind} from "./AutoActionTriggerKind";

export default class StartOfEachTurnAutoAction extends AutoAction {
    action: (self: Computer, time: number, state: State) => void;

    constructor(action : (c : Computer, time: number, s : State) => void) {
        super(AutoActionTriggerKind.StartOfTimeStep);
        this.action = action;
    }
}