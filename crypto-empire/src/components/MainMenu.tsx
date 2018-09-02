import * as React from 'react';
import {Component} from "react";
import App from "./App";


interface MainMenuProps {
    app: App;
}

class MainMenu extends Component<MainMenuProps, object> {
    render() {
        return (
            <div>
                <b>Main menu</b><br />
                Welcome to the Crypto Empire. Begin by choosing a level:<br />
                <button onClick={() => this.openlevel("1-unencrypted")} className="btn btn-primary btn-sm">1. Unencrypted<br /><small>What does Alice send to Bob?</small></button><br />
            </div>
        );
    }

    constructor(props : MainMenuProps) {
        super(props);
        this.openlevel = this.openlevel.bind(this);
    }


    private openlevel(name : string) {
        this.props.app.openLevel(name);
    }
}

export default MainMenu;