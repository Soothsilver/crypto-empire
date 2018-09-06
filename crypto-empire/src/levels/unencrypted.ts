import LevelDefinition from "./LevelDefinition";
import Session from "../rules/Session";
import {Computer} from "../rules/Computer";
import {Tag} from "../rules/Tag";
import Information from "../rules/information/Information";
import State from "../rules/State";
import PlaintextInformation from "../rules/information/PlaintextInformation";

export default class Unencrypted extends LevelDefinition {
    loadInto(session: Session): void {
        let s : State = session.getLastState();
        let alice = new Computer("Alice", [ Tag.Secure]);
        let bob = new Computer("Bob", [ Tag.Secure]);
        s.computers.push(alice);
        s.computers.push(bob);
        let tygerTygerFull =`
Tyger Tyger, burning bright,<br> 
In the forests of the night;<br> 
What immortal hand or eye,<br>
Could frame thy fearful symmetry?<br> 
<br> 
In what distant deeps or skies. <br> 
Burnt the fire of thine eyes? <br> 
On what wings dare he aspire? <br> 
What the hand, dare seize the fire?<br>  
<br> 
And what shoulder, & what art, <br> 
Could twist the sinews of thy heart? <br> 
And when thy heart began to beat, <br> 
What dread hand? & what dread feet? <br> 
<br> 
What the hammer? what the chain, <br> 
In what furnace was thy brain? <br> 
What the anvil? what dread grasp, <br> 
Dare its deadly terrors clasp! <br> 
<br> 
When the stars threw down their spears <br> 
And water'd heaven with their tears: <br> 
Did he smile his work to see? <br> 
Did he who made the Lamb make thee? <br> 
<br> 
Tyger Tyger burning bright, <br> 
In the forests of the night: <br> 
What immortal hand or eye, <br> 
Dare frame thy fearful symmetry?
`;
        s.inventory.push(new PlaintextInformation("Tyger, tyger", "Right-click to read beautiful poetry.", tygerTygerFull));
    }
}