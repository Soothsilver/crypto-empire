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
        let options = super.addMenuOptions();
        for (let i = 0; i < 2; i++) {
            let suboptions : IContextMenuOption[] = [];
            for (let j = 0; j < 20; j++) {
                suboptions.push({
                    caption: "Option X",
                    doWhat: ()=>{}
                });
            }
            options.push({
                caption: "A submenu",
                submenu: suboptions
            });
        }
        options = options.concat([
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
        return options;
    }


    abstract copy(newState: State): AsciiInformation;
}