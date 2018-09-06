import {Computer} from "./Computer";
import Information from "./information/Information";
import State from "./State";

export default class Session {
    public time: number = 0;
    public stateStack: State[] = [ new State() ];

    public getLastState() : State {
        return this.stateStack[this.stateStack.length - 1];
    }

    advanceTime() {
        this.time++;
    }

    rewindTime() {
        this.time--;
    }
}