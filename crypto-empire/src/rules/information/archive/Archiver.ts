import Algorithm from "../Algorithm";
import State from "../../State";
import ArchiveInformation from "./ArchiveInformation";
import ContextMenuSubmenu from "../../../external/ContextMenuSubmenu";
import ContextMenuOption from "../../../external/ContextMenuOption";

export default class Archiver extends Algorithm {
    constructor(state: State) {
        super("Archiver", "Packs and unpacks files", state);
    }

    copy(newState: State): Archiver {
        let cp = new Archiver(newState);
        this.addBaseInformationToCopy(cp);
        return cp;
    }


    addMenuOptions(): IContextMenuOption[] {
        return super.addMenuOptions().concat([
            {
                caption: "Create empty archive",
                doWhat: () => {
                    this.state.createInformation(new ArchiveInformation("Unnamed archive", this.state));
                }
            },
            {
                caption: "Add to archive",
                submenu: this.state.inventory.filter(info => info instanceof ArchiveInformation)
                    .map(archiveInformation => new ContextMenuSubmenu(
                        archiveInformation.caption,
                        this.state.inventory.filter(otherFile => otherFile != archiveInformation).map(otherFile => new ContextMenuOption("...file " + otherFile.caption,
                            () => {
                                            let number = this.state.inventory.indexOf(archiveInformation);
                                            let newArchiveInformation = new ArchiveInformation(archiveInformation.caption, this.state,
                                                ...(archiveInformation as ArchiveInformation).archivedInformation.concat([otherFile.copy(this.state)]));
                                            newArchiveInformation.local = true;
                                            this.state.inventory.splice(number, 1, newArchiveInformation);
                                      }
                            )
                        )
                    ))
            }
        ])
    }
}