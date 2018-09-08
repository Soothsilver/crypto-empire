import State from "./State";

export default class Session {
    public time: number = 0;
    public stateStack: State[] = [];
    public levelNiceName: string = "Unnamed level";
    public levelNiceDescription: string = "";
    won: boolean;
    /**
     * You will win when you read this text.
     */
    winOnReading: string;

    constructor() {
        let state = new State();
        state.session = this;
        this.stateStack.push(state)
    }

    public getLastState(): State {
        return this.stateStack[this.stateStack.length - 1];
    }

    advanceTime() {
        this.time++;
        this.stateStack.push(this.getLastState().copy());
        this.getLastState().stepBegins(this.time + 1);
    }

    rewindTime() {
        this.time--;
        this.stateStack.pop();
    }
}