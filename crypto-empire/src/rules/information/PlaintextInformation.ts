import Information from "./Information";

export default class PlaintextInformation extends Information {
    private fulltext: string;

    constructor(caption : string, subcaption : string, fulltext: string) {
        super(caption, subcaption);
        this.fulltext = fulltext;
    }

    addMenuOptions(): IContextMenuOption[] {
        return [
            {
                caption: "Read",
                doWhat: () => {
                    $("#infoheader").text(this.caption);
                    $("#infotext").html(this.fulltext);
                    $("#myModal").modal();
                }
            }
        ];
    }
}