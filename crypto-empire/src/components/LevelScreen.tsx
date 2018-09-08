import * as React from 'react';
import {Component} from "react";
import App from "./App";
import Session from "../rules/Session";
import SessionCreator from "../rules/SessionCreator";
import NetworkView from "./NetworkView";
import Timeline from "./Timeline";
import Inventory from "./Inventory";
import LevelDefinition from "../levels/LevelDefinition";
import {getFollowingLevel} from "../utils/Functions";

interface LevelScreenProperties {
    levelDefinition : LevelDefinition;
    app: App;
}


class LevelScreen extends Component<LevelScreenProperties> {

    session : Session;
    lastLevelDefinition : LevelDefinition;

    constructor(props : LevelScreenProperties) {
        super(props);
        this.returnToMainMenu = this.returnToMainMenu.bind(this);
        this.goToNextLevel = this.goToNextLevel.bind(this);
        this.lastLevelDefinition = this.props.levelDefinition;
        this.session = SessionCreator.createLevel(this.props.levelDefinition);
    }

    render() {
        if (this.props.levelDefinition != this.lastLevelDefinition) {
            this.lastLevelDefinition = this.props.levelDefinition;
            this.session = SessionCreator.createLevel(this.props.levelDefinition);
        }
        return (
            <div>
                <div className="top-bar">
                    <h2>{ this.session.levelNiceName }</h2>
                    <span>{ this.session.levelNiceDescription }</span>
                </div>
                <NetworkView state={this.session.getLastState()} levelScreen={this} />
                <Timeline session={this.session} levelScreen={this} />
                <Inventory state={this.session.getLastState()} levelScreen={this}  />
                <hr />
                <button onClick={this.returnToMainMenu} className="btn btn-danger btn-sm" title="Return to main menu">Abandon</button>
            </div>
        );
    }

    returnToMainMenu() {
        this.props.app.goToMainMenu();
    }

    refresh() {
        this.forceUpdate();
    }

    goToNextLevel() {
        let followingLevel = getFollowingLevel(this.props.levelDefinition);
        if (followingLevel != undefined) {
            this.props.app.openLevel(followingLevel);
        }
    }
}

export default LevelScreen;