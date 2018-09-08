import AsciiInformation from "./AsciiInformation";
import ciphertextIcon from "../../images/encrypted-letter.png";

export default abstract class Ciphertext extends AsciiInformation {
    plaintext: AsciiInformation;

    getIcon(): string {
        return ciphertextIcon;
    }

    getCssClass(): string {
        return "encrypted";
    }
}