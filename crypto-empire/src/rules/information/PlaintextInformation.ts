import Information from "./Information";
import {prettifyMessage, showInformationModal} from "../../utils/Functions";
import State from "../State";



export default class PlaintextInformation extends Information {
    private fulltext: string;

    constructor(caption : string, subcaption : string, fulltext: string, state : State) {
        super(caption, subcaption, state);
        this.fulltext = prettifyMessage(fulltext);
    }

    addMenuOptions(): IContextMenuOption[] {
        return super.addMenuOptions().concat([
            {
                caption: "Read",
                doWhat: () => {
                    console.log(this.fulltext);
                    console.log(this.state.session.winOnReading);
                    if (this.fulltext.includes(prettifyMessage(this.state.session.winOnReading))) {
                        this.state.session.won = true;
                        console.log("victory");
                    }
                    showInformationModal(this.caption, this.fulltext);
                }
            }
        ]);
    }

    copy(newState : State): Information {
        let pi = new PlaintextInformation(this.caption, this.subcaption, this.fulltext, newState);
        return pi;
    }
}