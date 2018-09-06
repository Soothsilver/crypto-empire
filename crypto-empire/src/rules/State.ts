import Information from "./information/Information";
import {Computer} from "./Computer";

export default class State {
    public computers: Computer[] = [];
    public inventory: Information[] = [];
}