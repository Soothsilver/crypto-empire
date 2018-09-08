import Information from "./Information";
import State from "../State";
import Algorithm from "./Algorithm";

export default class Base64Algorithm extends Algorithm {

    constructor(state: State) {
        super("Base64 encoder", "Encodes and decodes data to and from Base64", state);
    }

    copy(newState: State): Information {
        return new Base64Algorithm(newState);
    }
}