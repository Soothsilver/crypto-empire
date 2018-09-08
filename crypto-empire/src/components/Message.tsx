import * as React from 'react';
import {Component} from 'react';
import messageIcon from '../images/secured-letter.png'
import Mathematics from "../utils/Mathematics";
import Information from "../rules/information/Information";
import State from "../rules/State";
import PlaintextInformation from "../rules/information/PlaintextInformation";
import LevelScreen from "./LevelScreen";


interface MessageProps {
    caption: string;
    subcaption: string;
    information: Information;
    levelScreen: LevelScreen;
}

class Message extends Component<MessageProps> {
    static WIDTH: number = 200;
    static HEIGHT: number = 58;
    private uniqueHtmlId: string = Mathematics.getUniqueId();

    render() {
        return (
            <div className="message" id={this.uniqueHtmlId}>
                <div className="message-img-div">
                    <img src={messageIcon}  />
                </div>
                <div className="message-contents">
                    <span className="message-caption">
                        {this.props.caption}
                    </span>
                    <br/>
                    <span>
                        {this.props.subcaption}
                    </span>
                </div>
                <div className="message-terminator"/>
            </div>);
    }

    componentDidMount(): void {
        let data: any[] = [{
            header: this.props.caption
        }];
        for (let mo of this.props.information.addMenuOptions()) {
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

export default Message;