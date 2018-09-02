import * as React from 'react';
import {Component} from 'react';
import {SessionLevelProps} from "./SessionLevelProps";

class Inventory extends Component<SessionLevelProps> {
    render() {
        return (
            <div className="round-container">
                <small><i>Your inventory is empty.</i></small>
            </div>
        );
    }
}

export default Inventory;