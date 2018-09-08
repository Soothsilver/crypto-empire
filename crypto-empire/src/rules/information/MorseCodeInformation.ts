import Information from "./Information";
import {prettifyMessage, showInformationModal} from "../../utils/Functions";
import State from "../State";
import AsciiInformation from "./AsciiInformation";
import MorseCodeAlgorithm from "./MorseCodeAlgorithm";
import Ciphertext from "./Ciphertext";



export default class MorseCodeInformation extends Ciphertext {
    plaintext: AsciiInformation;

    constructor(plaintext : AsciiInformation, state : State) {
        super(MorseCodeAlgorithm.encrypt(plaintext.caption), MorseCodeAlgorithm.encrypt(plaintext.subcaption), state, MorseCodeAlgorithm.encrypt(plaintext.fulltext));
        this.plaintext = plaintext;
    }

    addMenuOptions(): IContextMenuOption[] {
        return super.addMenuOptions();
    }

    copy(newState : State): MorseCodeInformation {
        let pi = new MorseCodeInformation(this.plaintext.copy(newState), newState)
        return pi;
    }
}