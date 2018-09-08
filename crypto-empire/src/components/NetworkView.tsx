import * as React from 'react';
import {Component} from 'react';
import {StateLevelProps} from "./StateLevelProps";
import {Computer} from "../rules/Computer";
import ComputerIcon from "./ComputerIcon";
import Envelope from "../rules/information/Envelope";
import EnvelopeComponent from './EnvelopeComponent';

class NetworkView extends Component<StateLevelProps> {
    render() {
        return (
            <div className="network-view round-container">
                {
                    this.props.state.computers.map((computer: Computer) => {
                        return (
                            <ComputerIcon computer={computer} levelScreen={this.props.levelScreen}/>
                        );
                    })
                }
                {
                    this.props.state.messages.map((envelope : Envelope) => {
                    return (
                        <EnvelopeComponent envelope={envelope} levelScreen={this.props.levelScreen} />
                    );
                })
                }
            </div>
        );
    }
}

export default NetworkView;