import * as React from 'react';
import {Component} from 'react';
import {SessionLevelProps} from "./SessionLevelProps";

class NetworkView extends Component<SessionLevelProps> {
    render() {
        return (
            <div className="network-view round-container">
                Network
            </div>
        );
    }
}

export default NetworkView;