import * as React from 'react';
import {Component} from "react";
import App from "./App";
import {levels} from "../levels/Campaign";
import LevelDefinition from "../levels/LevelDefinition";


interface MainMenuProps {
    app: App;
}

class MainMenu extends Component<MainMenuProps, object> {
    render() {
        return (
            <div>
                <b>Main menu</b><br/>
                Welcome to the Crypto Empire. Begin by choosing a level:<br/>
                <div className="levels">
                {
                    levels.map((definition: LevelDefinition) => {
                        return (
                            <button className="btn btn-default btn-sm" onClick={() => this.openlevel(definition)}><b>{ definition.getName() }</b><br/>
                                <small>{ definition.getShortDescription() }</small>
                            </button>
                        );
                    })
                }
                </div>
            </div>
        );
    }

    constructor(props: MainMenuProps) {
        super(props);
        this.openlevel = this.openlevel.bind(this);
    }


    private openlevel(definition: LevelDefinition) {
        this.props.app.openLevel(definition);
    }
}

export default MainMenu;