import State from "../../State";
import Algorithm from "../Algorithm";
import * as crypto from "crypto-js";
import AsciiInformation from "../AsciiInformation";
import Key from "../Key";
import ContextMenuOption from "../../../external/ContextMenuOption";
import PlaintextInformation from "../PlaintextInformation";
import RSAInformation from "./RSAInformation";
import * as rstring from "randomstring";

export default class RSAAlgorithm extends Algorithm {

    constructor(state: State) {
        super("RSA", "Rivest–Shamir–Adleman", state);
    }

    copy(newState: State): RSAAlgorithm {
        let copy = new RSAAlgorithm(newState);
        this.addBaseInformationToCopy(copy);
        return copy;
    }


    addMenuOptions(): IContextMenuOption[] {
        return super.addMenuOptions().concat([
            {
                caption: "Create a new key pair",
                doWhat: () => {
                    let { privateKey, publicKey } = RSAAlgorithm.createKeyPairPrivatePublic(this.state);
                    this.state.createInformation(privateKey);
                    this.state.createInformation(publicKey);
                }
            },
            {
                caption: "Encrypt",
                submenu: this.state.inventory.filter(info => info instanceof AsciiInformation).map(plaintext => {
                    return {
                        caption: plaintext.caption,
                        submenu: this.state.inventory.filter(info => info instanceof Key).map(key =>
                            new ContextMenuOption("...with public key " + key.caption, () => {
                                this.state.createInformation(RSAInformation.encrypt(plaintext as AsciiInformation, (key as Key), this.state));
                            }))
                    };
                })
            },
            {
                caption: "Decrypt",
                submenu: this.state.inventory.filter(info => info instanceof RSAInformation).map(ciphertext => {
                    return {
                        caption: ciphertext.caption,
                        submenu: this.state.inventory.filter(info => info instanceof Key).map(key =>
                            new ContextMenuOption("...with private key " + key.caption, () => {
                                let kkey = key as Key;
                                let iinfo = ciphertext as RSAInformation;
                                if (kkey.fulltext == iinfo.privateKey) {
                                    this.state.download(iinfo.plaintext);
                                } else {
                                    this.state.createInformation(new PlaintextInformation("Garbage", "Meaningless bytes", "[you see a seemingly random array of bytes...]", this.state));
                                }

                            }))
                    }
                })
            }]);
    }

    static encrypt(plaintext: string) : string {
        return rstring.generate({
            length: plaintext.length,
            charset: 'alphanumeric'
        });
    }

    static createKeyPairPrivatePublic(state : State, name : string = "Your") : { privateKey: Key, publicKey: Key } {
        let privateKey = new Key(name + " private key", "RSA private key", state,  "-----BEGIN RSA PRIVATE KEY-----\n" + rstring.generate({
            length: 100,
            charset: 'alphanumeric'
        }) + "\n-----END RSA PRIVATE KEY-----");
        privateKey.isPrivate = true;

        let publicKey = new Key(name + " public key", "RSA public key", state,  "-----BEGIN RSA PUBLIC KEY-----\n" + rstring.generate({
            length: 100,
            charset: 'alphanumeric'
        }) + "\n-----END RSA PUBLIC KEY-----");
        publicKey.isPrivate = false;

        privateKey.correspondingKey = publicKey.fulltext;
        publicKey.correspondingKey = privateKey.fulltext;

        return {
            privateKey,
            publicKey
        };
    }
}