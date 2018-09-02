import * as React from 'react';
import {Component} from 'react';
import {SessionLevelProps} from "./SessionLevelProps";

class Timeline extends Component<SessionLevelProps> {
    render() {
        return (
            <div>
                <hr/>
                <div>
                    <div className="btn-group" style={{float: "left"}}>
                        <button className="btn btn-default btn-sm" disabled={this.props.session.time == 0} onClick={this.resetLevel}>Reset level</button>
                        <button className="btn btn-default btn-sm" disabled={this.props.session.time == 0} onClick={this.rewindTime}>Rewind time</button>
                    </div>
                    <div style={{float: "left", paddingLeft: "10px", paddingRight: "10px", paddingTop: "5px"}}>
                        Step {this.props.session.time + 1}
                    </div>
                    <div style={{float: "right"}}>
                        <button className="btn btn-default btn-sm" onClick={this.advanceTime}>Advance time</button>
                    </div>
                </div>
                <div style={{clear: "both"}}>
                </div>
                <hr/>
            </div>
        );
    }

    advanceTime = () => {
        this.props.session.advanceTime();
        this.props.levelScreen.refresh();
    };
    resetLevel = () => {
        while (this.props.session.time > 0) {
            this.props.session.rewindTime();
        }
        this.props.levelScreen.refresh();
    };
    rewindTime = () => {
        this.props.session.rewindTime();
        this.props.levelScreen.refresh();
    };
}

export default Timeline;