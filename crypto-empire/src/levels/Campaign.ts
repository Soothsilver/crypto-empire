import LevelDefinition from "./LevelDefinition";
import Unencrypted from "./unencrypted";
import MorseCode from "./morsecode";
import SymmetricLevel from "./symmetric";

export const levels : LevelDefinition[] = [
    new Unencrypted(),
    new MorseCode(),
    new SymmetricLevel()
];