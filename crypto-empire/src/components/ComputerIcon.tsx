import * as React from 'react';
import {Component} from 'react';
import {Computer} from "../rules/Computer";
import ComputerSprite from '../images/computer.png'
import FileServerIcon from '../images/file-server.png'
import LockedIcon from '../images/locked.png'
import Mathematics from "../utils/Mathematics";
import {$id} from "../utils/Functions";
import LevelScreen from "./LevelScreen";
import {Tag} from "../rules/Tag";

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
                </div>
            </div>
        );
    }


    componentDidMount(): void {
        $id(this.uniqueHtmlId).animate({
           left: this.props.computer.location.x,
           top: this.props.computer.location.y
        });
        let data : any[] = [{
            header: this.props.computer.name
        }];
        for (let mo of this.props.computer.addMenuOptions()) {
            data.push({
                text: mo.caption,
                action: (e: any) => {
                    e.preventDefault();
                    mo.doWhat();
                    this.props.levelScreen.refresh();
                }
            })
        }
        context.attach("#" + this.uniqueHtmlId, data);
    }

    componentWillUnmount(): void {
        context.destroy("#" + this.uniqueHtmlId);
    }

}

export default ComputerIcon;