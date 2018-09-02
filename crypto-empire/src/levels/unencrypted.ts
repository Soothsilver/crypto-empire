import LevelDefinition from "./LevelDefinition";
import Session from "../rules/Session";
import {Computer} from "../rules/Computer";

export default class Unencrypted extends LevelDefinition {
    loadInto(s: Session): void {
        let alice = new Computer("Alice", []);
        s.computers.push()
    }
}