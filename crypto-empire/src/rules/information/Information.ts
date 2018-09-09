import State from "../State";
import messageIcon from '../../images/secured-letter.png'
import ContextMenuOption from "../../external/ContextMenuOption";
import ContextMenuSubmenu from "../../external/ContextMenuSubmenu";
import {Computer} from "../Computer";


export default abstract class Information {
    public caption: string;
    public subcaption: string;
    public local: boolean;
    public state: State;

    constructor(caption : string, subcaption: string, state : State) {
        this.caption = caption;
        this.subcaption = subcaption;
        this.state = state;
    }

    addMenuOptions() : IContextMenuOption[] {
        let options : IContextMenuOption[] = [];
        if (this.local) {
            options = [
                {
                    caption: "Delete",
                    doWhat: () => {
                        let number = this.state.inventory.indexOf(this);
                        if (number != -1) {
                            this.state.inventory.splice(number, 1);
                        }
                    }
                },
                {
                    caption: "Rename",
                    doWhat: () => {
                        let newname = window.prompt("Rename '" + this.caption + "' to what?", this.caption);
                        if (newname) {
                            this.caption = newname;
                        }
                    }
                }
            ];
            if (this.state.session.youAreActiveAttacker) {
                options.push(new ContextMenuSubmenu("Upload to",
                    this.state.computers.map(computer => new ContextMenuOption(computer.name, () => this.state.spawnMessage(this.state.you() as Computer, computer, this.copy(this.state))))));
            }
        } else {
            options = [
                {
                    caption: "Download",
                    doWhat: () => {
                        let copiedMessage = this.copy(this.state);
                        copiedMessage.local = true;
                        if (copiedMessage.subcaption == "Right-click to download.") {
                            copiedMessage.subcaption = "Right-click to read.";
                        }
                        this.state.inventory.push(copiedMessage);
                    }
                }
            ];
            if (this.state.session.youAreActiveAttacker) {
                options.push(new ContextMenuOption("Destroy",
                    ()=>{
                        this.state.destroyMessage(this);
                    }));
            }
        }
        return options;
    }

    abstract copy(newState : State) : Information;

    protected addBaseInformationToCopy(copy : Information) {
        copy.local = this.local;
    }

    getIcon(): string {
        return messageIcon;
    }

    getCssClass(): string {
        return "";
    }
}