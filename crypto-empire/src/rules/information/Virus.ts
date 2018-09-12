import Information from "./Information";
import State from "../State";
import VirusIcon from "../../images/virus.png";
import {showInformationModal} from "../../utils/Functions";

export default class Virus extends Information {

    constructor(state: State) {
        super("Virus", "Takes over a computer", state);
    }

    copy(newState: State): Information {
        let copy = new Virus(newState);
        this.addBaseInformationToCopy(copy);
        return copy;
    }


    getIcon(): string {
        return VirusIcon;
    }

    getCssClass(): string {
        return "virus";
    }

    addMenuOptions(): IContextMenuOption[] {
        return super.addMenuOptions().concat({
            caption: "Show instructions",
            doWhat: () => {
                showInformationModal("Virus",
                    "Upload this virus to an unsecured computer to get read/write access to its filesystem. You will be able to access it as though it were a public unprotected file server.");
            }
        })
    }
}