import {Tag} from "./Tag";
import Point from "./Point";
import {showInformationModal} from "../utils/Functions";
import State from "./State";
import AutoAction from "./autoaction/AutoAction";
import {AutoActionTriggerKind} from "./autoaction/AutoActionTriggerKind";
import Envelope from "./information/Envelope";
import MessageReceivedAutoAction from "./autoaction/MessageReceivedAutoAction";
import StartOfEachTurnAutoAction from "./autoaction/StartOfEachTurnAutoAction";
import {Locations} from "../levels/BuildingBlocks";

export class Computer {

    name: string;
    tags: Tag[];
    location: Point;
    ai: AutoAction[] = [];

    constructor(name : string, tags : Tag[], location: Point) {
        this.name = name;
        this.tags = tags;
        this.location = location;
    }


    addMenuOptions() : IContextMenuOption[] {
        return [
            {
                caption: "Investigate",
                doWhat: () => {
                    showInformationModal(this.name, "<ul><li>This computer is named <b>" + this.name + "</b>.</li><li>It's <b>secure</b>: You cannot hack it.</li></ul>");
                }
            }
        ]
    }

    copy() : Computer {
        let c : Computer = new Computer(this.name, this.tags, this.location);
        c.ai = this.ai;
        return c;
    }

    /**
     * In this method, the computer performs autonomous actions at start of steps.
     *
     * @param {State} state The state of the network as the state begins.
     * @param {number} time The time step we are in. After the first 'Advance time', the time step is 2.
     */
    stepBegins(state: State, time: number) {
        for (let aa of this.ai) {
            if (aa.trigger == AutoActionTriggerKind.StartOfTimeStep) {
                (aa as StartOfEachTurnAutoAction).action(this, time, state);
            }
        }
    }
    acceptEnvelope(m: Envelope, state : State): void {
        for (let aa of this.ai) {
            if (aa.trigger == AutoActionTriggerKind.MessageReceived) {
                (aa as MessageReceivedAutoAction).action(m.message);
            }
        }
    }

    static Alice() {
        return new Computer("Alice", [ Tag.Secure], Locations.Left );
    }

    static Bob() {
        return new Computer("Bob", [ Tag.Secure], Locations.Right );
    }

    static Frank() {
        return new Computer("Frank", [ Tag.Secure, Tag.FileServer], Locations.Leftmost );
    }
}