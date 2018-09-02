import * as React from 'react';

import MainMenu from "./MainMenu";
import LevelScreen from "./LevelScreen";



class App extends React.Component {
    goToMainMenu(): void {
        this.currentLevelName = null;
        this.forceUpdate();
    }
    openLevel(levelName: string): any {
        this.currentLevelName = levelName;
        this.forceUpdate();
    }

    currentLevelName: string | null = "1-unencrypted";

    public render() {
        return [
            this.currentLevelName ?
                (
                    <div className="everything">
                        <LevelScreen levelName={this.currentLevelName} app={this} />
                    </div>
                )
                :
                (
                    <div className="everything">
                        <MainMenu app={this} />
                    </div>
                ), (
                <div>
                    <hr/>
                    <small>This is an alpha version of the <b>Crypto Empire</b>, a game to teach fundamentals of
                        cryptographics protocols.
                    </small>
                </div>
            )];
    }
}

export default App;
