import * as React from 'react';
import {Component} from 'react';
import {Computer} from "../rules/Computer";
import ComputerSprite from '../images/computer.png'
import FileServerIcon from '../images/file-server.png'
import LockedIcon from '../images/locked.png'
import Mathematics from "../utils/Mathematics";
import HackerIcon from "../images/hacker.jpg";
import FistIcon from "../images/fist.png";
import FirewallIcon from "../images/firewall.png";
import TrustIcon from "../images/trust.png";
import {$id, createSubmenu} from "../utils/Functions";
import LevelScreen from "./LevelScreen";
import {Tag} from "../rules/Tag";
import * as assert from "assert";

interface ComputerProps {
    computer : Computer;
    levelScreen : LevelScreen;
}

class ComputerIcon extends Component<ComputerProps> {
    private uniqueHtmlId : string = Mathematics.getUniqueId();
    static WIDTH : number = 128;
    static HEIGHT : number = 128;

    render() {
        return (
            <div className="computer" id={this.uniqueHtmlId}>
                <img src={ComputerSprite} />
                <br />
                <span className="computer-name">{this.props.computer.name}</span><br />
                <div className="tags-line">
                    <img src={LockedIcon} title="SECURE. You cannot hack this computer." hidden={!this.props.computer.tags.includes(Tag.Secure)} />
                    <img src={FileServerIcon} title="FILE SERVER. Right-click this computer to download files from it." hidden={!this.props.computer.tags.includes(Tag.FileServer)} />
                    <img src={HackerIcon} title="YOUR CONTROL. This computer is under your control." hidden={!this.props.computer.tags.includes(Tag.You)} />
                    <img src={FistIcon} title="ACTIVE ATTACKER. This computer has the power to send and destroy messages." hidden={!this.props.computer.tags.includes(Tag.ActiveAttacker)} />
                    <img src={TrustIcon} title="TRUSTED. Most computers trust this computer to be truthful." hidden={!this.props.computer.tags.includes(Tag.Trusted)} />
                    <img src={FirewallIcon} title="FIREWALL. You cannot upload files here or send messages to this computer." hidden={!this.props.computer.tags.includes(Tag.Firewall)} />
                </div>
            </div>
        );
    }


    componentDidMount(): void {
        $id(this.uniqueHtmlId).animate({
           left: this.props.computer.location.x,
           top: this.props.computer.location.y
        });
        this.componentDidUpdate();
    }


    componentDidUpdate(): void {
        let data : any[] = [{
            header: this.props.computer.name
        }];
        data = data.concat(createSubmenu(this.props.computer.addMenuOptions(), this.props.levelScreen));
        console.warn("refreshing upon update #" + this.uniqueHtmlId);
        context.destroy("#" + this.uniqueHtmlId);
        console.warn("attaching " + data[0].header + " to #" + this.uniqueHtmlId);
        context.attach("#" + this.uniqueHtmlId, data);
    }

    componentWillUnmount(): void {
        console.warn("destroying upon unmount #" + this.uniqueHtmlId);
        context.destroy("#" + this.uniqueHtmlId);
    }

}

export default ComputerIcon;