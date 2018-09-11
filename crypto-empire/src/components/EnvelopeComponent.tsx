import * as React from 'react';
import {Component} from 'react';
import Mathematics from "../utils/Mathematics";
import Message from "./Message";
import Envelope from "../rules/information/Envelope";
import {$id} from "../utils/Functions";
import LevelScreen from "./LevelScreen";

interface EnvelopeProps {
    envelope: Envelope;
    levelScreen: LevelScreen;
}

class EnvelopeComponent extends Component<EnvelopeProps> {
    private uniqueHtmlId: string = Mathematics.getUniqueId();
    lastEnvelopeId: string | undefined;

    render() {
        return (<div className="envelope" id={this.uniqueHtmlId}
                     hidden={this.props.envelope.ceasedToExist}
                     style={{left: this.props.envelope.location.x, top: this.props.envelope.location.y, opacity: 0}}>
            <Message caption={this.props.envelope.message.caption} subcaption={this.props.envelope.message.subcaption}
                     information={this.props.envelope.message} levelScreen={this.props.levelScreen}/>
        </div>);
    }

    componentDidMount(): void {
       this.componentDidUpdate();
    }


    componentDidUpdate(): void {
        $id(this.uniqueHtmlId).css("left", this.props.envelope.location.x).css("top", this.props.envelope.location.y);
        this.lastEnvelopeId = this.props.envelope.identification;

        if (this.props.envelope.requestedFadeOut) {
            $id(this.uniqueHtmlId).animate({
                left: this.props.envelope.requestedLocation.x,
                top: this.props.envelope.requestedLocation.y,
                opacity: 0
            }, {
                complete: () => {
                    this.props.envelope.location = this.props.envelope.requestedLocation;
                }
            });
            $id(this.uniqueHtmlId).css("pointer-events", "none");
        } else {
            $id(this.uniqueHtmlId).animate({
                left: this.props.envelope.requestedLocation.x,
                top: this.props.envelope.requestedLocation.y,
                opacity: 1
            }, {
                complete: () => {
                    this.props.envelope.location = this.props.envelope.requestedLocation;
                }
            });
            $id(this.uniqueHtmlId).css("pointer-events", "auto");
        }
    }

    componentWillUnmount(): void {
    }
}

export default EnvelopeComponent;