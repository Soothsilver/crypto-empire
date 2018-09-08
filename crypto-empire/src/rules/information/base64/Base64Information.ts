import Information from "../Information";
import {prettifyMessage, showInformationModal} from "../../../utils/Functions";
import State from "../../State";
import AsciiInformation from "../AsciiInformation";
import MorseCodeAlgorithm from "../morse/MorseCodeAlgorithm";
import Ciphertext from "../Ciphertext";
import Base64Algorithm from "./Base64Algorithm";



export default class Base64Information extends Ciphertext {

    constructor(plaintext : AsciiInformation, state : State) {
        super(Base64Algorithm.encrypt(plaintext.caption), Base64Algorithm.encrypt(plaintext.subcaption), state, Base64Algorithm.encrypt(plaintext.fulltext));
        this.plaintext = plaintext;
    }

    addMenuOptions(): IContextMenuOption[] {
        return super.addMenuOptions();
    }

    copy(newState : State): Base64Information {
        let pi = new Base64Information(this.plaintext.copy(newState), newState);
        this.addBaseInformationToCopy(pi);
        return pi;
    }
}