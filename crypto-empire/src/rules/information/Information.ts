import State from "../State";
import messageIcon from '../../images/secured-letter.png'


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
        if (this.local) {
            return [
                {
                    caption: "Delete",
                    doWhat: () => {
                        let number = this.state.inventory.indexOf(this);
                        if (number != -1) {
                            this.state.inventory.splice(number, 1);
                        }
                    }
                }
            ]
        } else {
            return [
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
        }
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