import AsciiInformation from "./AsciiInformation";
import ciphertextIcon from "../../images/encrypted-letter.png";

export default abstract class Ciphertext extends AsciiInformation {

    getIcon(): string {
        return ciphertextIcon;
    }

    getCssClass(): string {
        return "encrypted";
    }
}