import AsciiInformation from "./AsciiInformation";
import State from "../State";
import KeyImage from "../../images/key.png";
export default class Key extends AsciiInformation {


    constructor(caption: string, subcaption: string, state: State, key: string) {
        super(caption, subcaption, state, key);
    }

    copy(newState: State): Key {
        let copy = new Key(this.caption, this.subcaption, this.state, this.fulltext);
        this.addBaseInformationToCopy(copy);
        return copy;
    }


    getIcon(): string {
        return KeyImage;
    }

    getCssClass(): string {
        return "key";
    }
}