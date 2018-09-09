import StartOfEachTurnAutoAction from "./StartOfEachTurnAutoAction";
import {Computer} from "../Computer";
import State from "../State";

export class TimedAutoAction extends StartOfEachTurnAutoAction {
      constructor(turnNumber : number, action : (state : State) => void) {
          super((aself, aturn, astate) => {
              if (aturn == turnNumber) {
                   action(astate);
              }
          });
      }
}