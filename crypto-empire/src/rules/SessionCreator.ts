import Session from "./Session";
import LevelDefinition from "../levels/LevelDefinition";
import Unencrypted from "../levels/unencrypted";
import {Tag} from "./Tag";
import MessageReceivedAutoAction from "./autoaction/MessageReceivedAutoAction";

export default class SessionCreator {

    static createLevel(levelDefinition: LevelDefinition): Session {
        let s = new Session();
        let d: LevelDefinition = levelDefinition;
        s.levelNiceName = d.getName();
        s.levelNiceDescription = d.getMissionStatement();
        d.loadInto(s, s.getLastState());
        for (let c of s.getLastState().computers) {
            c.state = s.getLastState();
            if (c.tags.includes(Tag.You)) {
                if (c.tags.includes(Tag.ActiveAttacker)) {
                    s.youAreActiveAttacker = true;
                }
                c.ai.push(new MessageReceivedAutoAction((msg, state) => {
                    state.download(msg);
                }));
            }
        }
        for (let inf of s.getLastState().inventory) {
            inf.local = true;
        }
        return s;
    }
}