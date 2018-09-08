import Information from "./Information";
import {prettifyMessage, showInformationModal} from "../../utils/Functions";
import State from "../State";

export default abstract class AsciiInformation extends Information{
    fulltext: string;


    constructor(caption: string, subcaption: string, state: State, fulltext: string) {
        super(caption, subcaption, state);
        this.fulltext = fulltext;
    }

    addMenuOptions(): IContextMenuOption[] {
        return super.addMenuOptions().concat([
            {
                caption: "Read",
                doWhat: () => {
                    if (this.fulltext.includes(this.state.session.winOnReading)) {
                        this.state.session.won = true;
                        console.log("victory");
                    }
                    showInformationModal(this.caption, prettifyMessage(this.fulltext));
                }
            }
        ]);
    }


    abstract copy(newState: State): AsciiInformation;
}