import Information from "./Information";
import {prettifyMessage, showInformationModal} from "../../utils/Functions";
import State from "../State";
import AsciiInformation from "./AsciiInformation";



export default class PlaintextInformation extends AsciiInformation {
    constructor(caption : string, subcaption : string, fulltext: string, state : State) {
        super(caption, subcaption, state, fulltext);
    }

    copy(newState : State): PlaintextInformation {
        let copy = new PlaintextInformation(this.caption, this.subcaption, this.fulltext, newState);
        this.addBaseInformationToCopy(copy);
        return copy;
    }
}