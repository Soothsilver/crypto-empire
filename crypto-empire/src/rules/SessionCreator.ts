import Session from "./Session";
import LevelDefinition from "../levels/LevelDefinition";
import Unencrypted from "../levels/unencrypted";

export default class SessionCreator {

    static createLevel(levelName: string) : Session {
        let s = new Session();
        let d : LevelDefinition = undefined;
        switch (levelName) {
            case "1-unencrypted":
                d = new Unencrypted();
                break;
        }
        d.loadInto(s);
        return s;
    }
}