import AutoAction from "./AutoAction";
import StartOfEachTurnAutoAction from "./StartOfEachTurnAutoAction";
import State from "../State";

export default class NextTurnAutoAction extends StartOfEachTurnAutoAction {

    usedUp: boolean;

    constructor(action: (s: State) => void) {
        super((one, two, three)=> {
            if (this.usedUp) return;
            this.usedUp = true;
            action(three);
        });
    }
}