import * as React from 'react';
import {Component} from "react";
import App from "./App";
import Session from "../rules/Session";
import SessionCreator from "../rules/SessionCreator";
import NetworkView from "./NetworkView";
import Timeline from "./Timeline";
import Inventory from "./Inventory";

interface LevelScreenProperties {
    levelName : string;
    app: App;
}

class LevelScreen extends Component<LevelScreenProperties> {

    session : Session;

    constructor(props : LevelScreenProperties) {
        super(props);
        this.returnToMainMenu = this.returnToMainMenu.bind(this);
        this.session = SessionCreator.createLevel(this.props.levelName);
    }

    render() {
        return (
            <div>
                <NetworkView session={this.session} levelScreen={this} />
                <Timeline session={this.session} levelScreen={this} />
                <Inventory session={this.session} levelScreen={this}  />
                <hr />
                <button onClick={this.returnToMainMenu} className="btn btn-danger btn-sm" title="Return to main menu">Abandon</button>
            </div>
        );
    }

    private returnToMainMenu() {
        this.props.app.goToMainMenu();
    }

    refresh() {
        this.forceUpdate();
    }
}

export default LevelScreen;