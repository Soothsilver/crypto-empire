import LevelDefinition from "./LevelDefinition";
import Unencrypted from "./unencrypted";
import MorseCode from "./morsecode";

export const levels : LevelDefinition[] = [
    new Unencrypted(),
    new MorseCode()
];