import Information from "../Information";
import State from "../../State";
import Algorithm from "../Algorithm";
import MorseCodeInformation from "./MorseCodeInformation";
import AsciiInformation from "../AsciiInformation";

export default class MorseCodeAlgorithm extends Algorithm {

    constructor(state: State) {
        super("Morse code", "Full table of morse codes for all letters", state);
    }

    copy(newState: State): Information {
        let copy = new MorseCodeAlgorithm(newState);
        this.addBaseInformationToCopy(copy);
        return copy;
    }


    addMenuOptions(): IContextMenuOption[] {
        var encryptionMenu : IContextMenuOption[] = [];
        var decryptionMenu : IContextMenuOption[] = [];

        for (let info of this.state.inventory) {
            if (info instanceof MorseCodeInformation) {
                decryptionMenu.push({
                    caption: info.caption,
                    doWhat: () => this.decrypt(info as MorseCodeInformation)
                });
            }
            if (info instanceof AsciiInformation) {
                encryptionMenu.push({
                    caption: info.caption,
                    doWhat: () => this.encryptAndSave(info as AsciiInformation)
                })
            }
        }


        return super.addMenuOptions().concat([
            {
                caption: "Encode",
                submenu: encryptionMenu
            },
            {
                caption: "Decode",
                submenu: decryptionMenu
            }
        ]);
    }

    private decrypt(info: MorseCodeInformation) {
        this.state.download(info.plaintext);
    }
    private encryptAndSave(info: AsciiInformation) {
        this.state.createInformation(new MorseCodeInformation(info.copy(this.state), this.state));
    }

    static MORSE_MAP = {
        A: '.-',
        B: '-...',
        C: '-.-.',
        D: '-..',
        E: '.',
        F: '..-.',
        G: '--.',
        H: '....',
        I: '..',
        J: '.---',
        K: '-.-',
        L: '.-..',
        M: '--',
        N: '-.',
        O: '---',
        P: '.--.',
        Q: '--.-',
        R: '.-.',
        S: '...',
        T: '-',
        U: '..-',
        V: '...-',
        W: '.--',
        X: '-..-',
        Y: '-.--',
        Z: '--..',
        '1': '.----',
        '2': '..---',
        '3': '...--',
        '4': '....-',
        '5': '.....',
        '6': '-....',
        '7': '--...',
        '8': '---..',
        '9': '----.',
        '0': '-----',
        ',': '/',
        '.': '/',
        '?': '///',
        '/': '///',
        '-': '//',
        '(': '//',
        ')': '//',
        '\r': '',
        '\n': ''
    };

    /**
     * Encrypt a text string into morse code. One space implies
     * a different character, while two spaces implies a different word.
     *
     * @param str The ASCII input string
     */
    static encrypt(str: string): string {
        let encrypted = '';
        str.toUpperCase().split('').forEach((char: string) => {
            if (char !== ' ') {
                encrypted += MorseCodeAlgorithm.MORSE_MAP[char] + '/';
            } else {
                encrypted += '/ ';
            }
        });

        return encrypted + "//";
    }

}