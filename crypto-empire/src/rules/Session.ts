import {Computer} from "./Computer";

export default class Session {
    public time: number = 0;
    public computers: Computer[];

    advanceTime() {
        this.time++;
    }

    rewindTime() {
        this.time--;
    }
}