import Session from "../rules/Session";
import State from "../rules/State";

export default abstract class LevelDefinition {
     abstract getName() : string;
     abstract getShortDescription() : string;
     abstract loadInto(session: Session, state : State): void;
     getMissionStatement() : string {
          return this.getShortDescription();
     }
}