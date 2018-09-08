import * as React from 'react';
import {Component} from 'react';
import {StateLevelProps} from "./StateLevelProps";
import Information from "../rules/information/Information";
import Message from '../components/Message'

class Inventory extends Component<StateLevelProps> {
    render() {
        return (
            <div className="round-container inventory">
                <i>Your inventory: </i><br /><br />
                {
                    this.props.state.inventory.map((information : Information) => {
                       return (<Message caption={information.caption} subcaption={information.subcaption} information={information} levelScreen={this.props.levelScreen}></Message>);
                    })
                }
                <div className="clear" />
            </div>
        );
    }
}

export default Inventory;