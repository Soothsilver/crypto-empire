import * as React from 'react';
import {Component} from 'react';
import messageIcon from '../images/secured-letter.png'
import Mathematics from "../utils/Mathematics";
import Information from "../rules/information/Information";
import Message from "./Message";
import Envelope from "../rules/information/Envelope";
import {$id} from "../utils/Functions";
import LevelScreen from "./LevelScreen";

interface EnvelopeProps {
    envelope : Envelope;
    levelScreen: LevelScreen;
}

class EnvelopeComponent extends Component<EnvelopeProps> {
    private uniqueHtmlId : string = Mathematics.getUniqueId();

    render() {
        return (<div className="envelope" id={this.uniqueHtmlId} style={{ left: this.props.envelope.location.x, top: this.props.envelope.location.y, opacity: 0 }}>
            <Message caption={this.props.envelope.message.caption} subcaption={this.props.envelope.message.subcaption} information={this.props.envelope.message} levelScreen={this.props.levelScreen}/>
        </div>);
    }

    componentDidMount(): void {
        $id(this.uniqueHtmlId).animate({
            left: this.props.envelope.requestedLocation.x,
            top: this.props.envelope.requestedLocation.y,
            opacity: 1
        });
    }


    componentDidUpdate(prevProps: Readonly<EnvelopeProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.envelope.requestedFadeOut) {
            $id(this.uniqueHtmlId).animate({
                left: this.props.envelope.requestedLocation.x,
                top: this.props.envelope.requestedLocation.y,
                opacity: 0
            });
        } else {
            $id(this.uniqueHtmlId).animate({
                left: this.props.envelope.requestedLocation.x,
                top: this.props.envelope.requestedLocation.y,
                opacity: 1
            });
        }
    }

    componentWillUnmount(): void {
    }
}

export default EnvelopeComponent;