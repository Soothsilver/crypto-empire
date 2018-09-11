import State from "../../State";
import AsciiInformation from "../AsciiInformation";
import Ciphertext from "../Ciphertext";
import Key from "../Key";
import RSAAlgorithm from "./RSAAlgorithm";


export default class RSAInformation extends Ciphertext {
    privateKey: string;

    private constructor(caption: string, ciphertext: string, privateKey: string, plaintext : AsciiInformation, state: State) {
        super(caption, "RSA-encrypted message", state, ciphertext);
        this.plaintext = plaintext;
        this.privateKey = privateKey;
    }

    copy(newState: State): RSAInformation {
        let copy = new RSAInformation(this.caption, this.fulltext, this.privateKey, this.plaintext, newState);
        copy.privateKey = this.privateKey;
        this.addBaseInformationToCopy(copy);
        return copy;
    }


    static encrypt(plaintext: AsciiInformation, publicKey: Key, state : State) : RSAInformation {
        let ciphertext = RSAAlgorithm.encrypt(plaintext.fulltext);
        let ciphercaption = RSAAlgorithm.encrypt(plaintext.caption);
        let correspondingKey = "[cannot be deciphered]";
        if (!publicKey.isPrivate) {
            correspondingKey = publicKey.correspondingKey;
        }

        let value = new RSAInformation(ciphercaption, ciphertext, correspondingKey, plaintext, state);
        return value;
    }
}