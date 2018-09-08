import State from "../../State";
import AsciiInformation from "../AsciiInformation";
import Ciphertext from "../Ciphertext";
import DESAlgorithm from "./DESAlgorithm";


export default class DESInformation extends Ciphertext {
    key: string;
    constructor(plaintext: AsciiInformation, key: string, state: State) {
        super(DESAlgorithm.encrypt(plaintext.caption, key), "DES-encrypted message", state, DESAlgorithm.encrypt(plaintext.fulltext, key));
        this.plaintext = plaintext;
        this.key = key;
    }

    copy(newState: State): DESInformation {
        let copy = new DESInformation(this.plaintext.copy(newState), this.key, newState);
        copy.caption = this.caption;
        copy.fulltext = this.fulltext;
        this.addBaseInformationToCopy(copy);
        return copy;
    }
}