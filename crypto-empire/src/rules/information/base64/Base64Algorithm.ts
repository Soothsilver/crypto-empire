import Information from "../Information";
import State from "../../State";
import Algorithm from "../Algorithm";
import * as crypto from "crypto-js";
import MorseCodeInformation from "../morse/MorseCodeInformation";
import AsciiInformation from "../AsciiInformation";
import Base64Information from "./Base64Information";

export default class Base64Algorithm extends Algorithm {

    constructor(state: State) {
        super("Base64", "Encoding scheme", state);
    }

    copy(newState: State): Information {
        let copy = new Base64Algorithm(newState);
        this.addBaseInformationToCopy(copy);
        return copy;
    }
    addMenuOptions(): IContextMenuOption[] {
        var encryptionMenu : IContextMenuOption[] = [];
        var decryptionMenu : IContextMenuOption[] = [];

        for (let info of this.state.inventory) {
            if (info instanceof Base64Information) {
                decryptionMenu.push({
                    caption: info.caption,
                    doWhat: () => this.decrypt(info as Base64Information)
                });
            }
            if (info instanceof AsciiInformation) {
                encryptionMenu.push({
                    caption: info.caption,
                    doWhat: () => this.encryptAndSave(info as AsciiInformation)
                })
            }
        }


        return super.addMenuOptions().concat([
            {
                caption: "Encode",
                submenu: encryptionMenu
            },
            {
                caption: "Decode",
                submenu: decryptionMenu
            }
        ]);
    }

    private decrypt(info: Base64Information) {
        this.state.download(info.plaintext);
    }
    private encryptAndSave(info: AsciiInformation) {
        this.state.createInformation(new Base64Information(info.copy(this.state), this.state));
    }

    static encrypt(plaintext : string) : string {
        const wordArray = crypto.enc.Utf8.parse(plaintext);
        const encoded = crypto.enc.Base64.stringify(wordArray);
         return encoded;
    }
}