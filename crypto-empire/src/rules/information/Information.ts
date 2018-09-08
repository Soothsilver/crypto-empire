import State from "../State";

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
        if (!this.local) {
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
            ]
        } else {
            return [];
        }
    }

    abstract copy(newState : State) : Information;
}