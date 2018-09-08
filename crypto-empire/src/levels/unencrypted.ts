import LevelDefinition from "./LevelDefinition";
import Session from "../rules/Session";
import {Computer} from "../rules/Computer";
import {Tag} from "../rules/Tag";
import Information from "../rules/information/Information";
import State from "../rules/State";
import PlaintextInformation from "../rules/information/PlaintextInformation";
import {Locations} from "./BuildingBlocks";
import StartOfEachTurnAutoAction from "../rules/autoaction/StartOfEachTurnAutoAction";
import {Story} from "./Story";

export default class Unencrypted extends LevelDefinition {
    loadInto(session: Session): void {
        let s : State = session.getLastState();
        let alice = new Computer("Alice", [ Tag.Secure], Locations.Left);
        let bob = new Computer("Bob", [ Tag.Secure], Locations.Right);
        alice.ai.push(new StartOfEachTurnAutoAction((computer, turn, state) => {
            if (turn == 2) {
                state.spawnMessage(alice, bob, new PlaintextInformation("Letter to Bob", "Right-click to download.",
                    Story.AliceToBob1, state));
            }
        }));
        session.winOnReading = Story.AliceToBob1;
        s.computers.push(alice);
        s.computers.push(bob);
        let tygerTygerFull =
            `Tyger Tyger, burning bright,
In the forests of the night;
What immortal hand or eye,
Could frame thy fearful symmetry?
 
In what distant deeps or skies.  
Burnt the fire of thine eyes?  
On what wings dare he aspire?  
What the hand, dare seize the fire?  
 
And what shoulder, & what art,  
Could twist the sinews of thy heart?  
And when thy heart began to beat,  
What dread hand? & what dread feet?  
 
What the hammer? what the chain,  
In what furnace was thy brain?  
What the anvil? what dread grasp,  
Dare its deadly terrors clasp!  
 
When the stars threw down their spears  
And water'd heaven with their tears:  
Did he smile his work to see?  
Did he who made the Lamb make thee?  
 
Tyger Tyger burning bright,  
In the forests of the night:  
What immortal hand or eye,  
Dare frame thy fearful symmetry?`;
        s.inventory.push(new PlaintextInformation("Tyger, tyger", "Right-click to read beautiful poetry.", tygerTygerFull, s));
    }

    getName(): string {
        return "Unencrypted";
    }

    getShortDescription(): string {
        return "Alice is sending a message to Bob. Read it!";
    }
}