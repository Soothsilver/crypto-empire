import Session from "./Session";
import LevelDefinition from "../levels/LevelDefinition";
import Unencrypted from "../levels/unencrypted";

export default class SessionCreator {

    static createLevel(levelDefinition: LevelDefinition): Session {
        let s = new Session();
        let d: LevelDefinition = levelDefinition;
        s.levelNiceName = d.getName();
        s.levelNiceDescription = d.getMissionStatement();
        d.loadInto(s, s.getLastState());

        for (let inf of s.getLastState().inventory) {
            inf.local = true;
        }
        return s;
    }
}