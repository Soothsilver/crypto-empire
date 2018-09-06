import Session from "../rules/Session";
import LevelScreen from "./LevelScreen";
import State from "../rules/State";

export interface StateLevelProps {
    state : State;
    levelScreen : LevelScreen;
}