import AsciiInformation from "./AsciiInformation";
import State from "../State";
import KeyImage from "../../images/key.png";

export default class Key extends AsciiInformation {
    public correspondingKey: string;
    public isPrivate: boolean;


    constructor(caption: string, subcaption: string, state: State, key: string) {
        super(caption, subcaption, state, key);
    }

    copy(newState: State): Key {
        let copy = new Key(this.caption, this.subcaption, newState, this.fulltext);
        this.addBaseInformationToCopy(copy);
        copy.correspondingKey = this.correspondingKey;
        copy.isPrivate = this.isPrivate;
        return copy;
    }


    getIcon(): string {
        return KeyImage;
    }

    getCssClass(): string {
        return "key";
    }
}