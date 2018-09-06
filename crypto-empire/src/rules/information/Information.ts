export  default abstract class Information {
    public caption: string;
    public subcaption: string;

    constructor(caption : string, subcaption: string) {
        this.caption = caption;
        this.subcaption = subcaption;
    }

    abstract addMenuOptions() : IContextMenuOption[];
}