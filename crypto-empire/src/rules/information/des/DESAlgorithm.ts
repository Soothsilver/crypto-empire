import State from "../../State";
import Algorithm from "../Algorithm";
import * as crypto from "crypto-js";
import AsciiInformation from "../AsciiInformation";
import DESInformation from "./DESInformation";
import Key from "../Key";
import ContextMenuOption from "../../../external/ContextMenuOption";
import PlaintextInformation from "../PlaintextInformation";

export default class DESAlgorithm extends Algorithm {

    constructor(state: State) {
        super("DES", "Data Encryption Standard", state);
    }

    copy(newState: State): DESAlgorithm {
        let copy = new DESAlgorithm(newState);
        this.addBaseInformationToCopy(copy);
        return copy;
    }


    addMenuOptions(): IContextMenuOption[] {
        return super.addMenuOptions().concat([
            {
                caption: "Encrypt",
                submenu: this.state.inventory.filter(info => info instanceof AsciiInformation).map(plaintext => {
                    return {
                        caption: plaintext.caption,
                        submenu: this.state.inventory.filter(info => info instanceof Key).map(key =>
                            new ContextMenuOption("...with key " + key.caption, () => {
                                this.state.createInformation(new DESInformation(plaintext as AsciiInformation, (key as Key).fulltext, this.state));
                            }))
                    };
                })
            },
            {
                caption: "Decrypt",
                submenu: this.state.inventory.filter(info => info instanceof DESInformation).map(ciphertext => {
                    return {
                        caption: ciphertext.caption,
                        submenu: this.state.inventory.filter(info => info instanceof Key).map(key =>
                            new ContextMenuOption("...with key " + key.caption, () => {
                                let kkey = key as Key;
                                let iinfo = ciphertext as DESInformation;
                                if (kkey.fulltext == iinfo.key) {
                                    this.state.download(iinfo.plaintext);
                                } else {
                                    this.state.createInformation(new PlaintextInformation("Garbage", "Meaningless bytes", "[you see a seemingly random array of bytes...]", this.state));
                                }
                            }))
                    }
                })
            }]);
    }

    static encrypt(plaintext: string, key: string) {
        let array: crypto.WordArray = crypto.DES.encrypt(plaintext, key);
        return array.ciphertext.toString();
    }
}