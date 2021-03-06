import LevelDefinition from "./LevelDefinition";
import Unencrypted from "./unencrypted";
import MorseCode from "./morsecode";
import SymmetricLevel from "./symmetric";
import MalloryIntro from "./malloryIntro";
import Rsa1 from "./rsa1";
import Rsa2 from "./rsa2";
import Trash from "./trash";
import FirstTrent from "./firsttrent";

export const levels : LevelDefinition[] = [
    new Unencrypted(),
    new MorseCode(),
    new SymmetricLevel(),
    new MalloryIntro(),
    new Rsa1(),
    new Rsa2(),
    new Trash(),
    new FirstTrent()
];