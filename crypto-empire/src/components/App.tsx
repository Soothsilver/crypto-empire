import * as React from 'react';

import MainMenu from "./MainMenu";
import LevelScreen from "./LevelScreen";
import LevelDefinition from "../levels/LevelDefinition";
import {levels} from "../levels/Campaign";


// TODO elsewhere: if computers change from level to level, their position is not updated
class App extends React.Component {
    goToMainMenu(): void {
        this.currentLevelDefinition = undefined;
        this.forceUpdate();
    }
    openLevel(levelDefinition: LevelDefinition): void {
        this.currentLevelDefinition = levelDefinition;
        this.forceUpdate();
    }

    currentLevelDefinition : LevelDefinition | undefined = levels[7];

    public render() {
        return [
            this.currentLevelDefinition ?
                (
                    <div className="everything">
                        <LevelScreen levelDefinition={this.currentLevelDefinition} app={this} />
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
