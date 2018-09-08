import * as React from 'react';
import {Component} from 'react';
import Mathematics from "../utils/Mathematics";
import Information from "../rules/information/Information";
import State from "../rules/State";
import PlaintextInformation from "../rules/information/PlaintextInformation";
import LevelScreen from "./LevelScreen";
import {createSubmenu} from "../utils/Functions";


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
            <div className={ "message " + this.props.information.getCssClass() } id={this.uniqueHtmlId}>
                <div className="message-img-div">
                    <img src={this.props.information.getIcon()}  />
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
        this.componentDidUpdate();
    }


    componentDidUpdate(): void {
        let data: any[] = [{
            header: this.props.caption
        }];
        data = data.concat(createSubmenu(this.props.information.addMenuOptions(), this.props.levelScreen));
        context.destroy("#" + this.uniqueHtmlId);
        context.attach("#" + this.uniqueHtmlId, data);
    }

    componentWillUnmount(): void {
        context.destroy("#" + this.uniqueHtmlId);
    }
}

export default Message;