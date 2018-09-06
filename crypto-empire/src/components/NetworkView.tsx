import * as React from 'react';
import {Component} from 'react';
import {StateLevelProps} from "./StateLevelProps";

class NetworkView extends Component<StateLevelProps> {
    render() {
        return (
            <div className="network-view round-container">
                Network
            </div>
        );
    }
}

export default NetworkView;