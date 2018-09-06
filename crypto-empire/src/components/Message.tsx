import * as React from 'react';
import {Component} from 'react';
import messageIcon from '../images/secured-letter.png'
import Mathematics from "../utils/Mathematics";
import Information from "../rules/information/Information";

interface MessageProps {
    caption: string;
    subcaption: string;
    information: Information;
}

class Message extends Component<MessageProps> {
    private uniqueHtmlId : string = Mathematics.getUniqueId();

    render() {
        return (<div className="message" id={this.uniqueHtmlId}>
                <img src={messageIcon} style={{float: "left"}} />
            <span className="message-caption">
                {this.props.caption}
            </span>
                <br/>
                <span>
                {this.props.subcaption}
            </span>
        </div>);
    }

    componentDidMount(): void {
        let data : any[] = [{
            header: this.props.caption
        }];
        for (let mo of this.props.information.addMenuOptions()) {
            data.push({
                text: mo.caption,
                action: (e: any) => {
                    e.preventDefault();
                    mo.doWhat();
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