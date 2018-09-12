import Information from "../Information";
import AsciiInformation from "../AsciiInformation";
import State from "../../State";
import ArchiveIcon from "../../../images/archive.png";

export default class ArchiveInformation extends AsciiInformation {

    archivedInformation : Information[] = [];

    constructor(caption : string, state: State, ...archivedInformation: Information[]) {
        super(caption, archivedInformation.length + " documents", state, ArchiveInformation.composeDescription(archivedInformation));
        this.archivedInformation = archivedInformation;
    }

    private static composeDescription(archivedInformation: Information[]) : string {
        let composition = "This archive contains " + archivedInformation.length + " pieces of information:\n\n";
        for (let info of archivedInformation) {
            composition += "- " + info.caption + " (" + info.subcaption + ")\n";
        }
        return composition;
    }

    getIcon(): string {
        return ArchiveIcon;
    }

    getCssClass(): string {
        return "archive";
    }


    addMenuOptions(): IContextMenuOption[] {
        return super.addMenuOptions().concat({
            caption: "Extract everything",
            doWhat: () => {
                for (let info of this.archivedInformation) {
                    this.state.createInformation(info.copy(this.state));
                }
            }
        })
    }

    copy(newState: State): ArchiveInformation {
        let ai = new ArchiveInformation(this.caption, newState, ...this.archivedInformation);
        this.addBaseInformationToCopy(ai);
        return ai;
    }

}