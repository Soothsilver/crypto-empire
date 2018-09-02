import Session from "../rules/Session";

export default abstract class LevelDefinition {

     abstract loadInto(s: Session): void;
}