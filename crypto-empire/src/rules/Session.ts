import State from "./State";

export default class Session {
    public time: number = 0;
    public stateStack: State[] = [];
    public levelNiceName: string = "Unnamed level";
    public levelNiceDescription: string = "";
    won: boolean;
    lost: boolean;
    lossReason: string = "You have not lost yet. You are seeing this message because of a bug in the Crypto Empire game.";
    /**
     * You will win when you read this text.
     */
    winOnReading: string;
    youAreActiveAttacker: boolean;
    objectives: string = "Read the plaintext message.";
    minimumVictoryTurn: number = 0;

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

    fail(reason: string) {
        this.lost = true;
        this.lossReason = reason;
    }
}