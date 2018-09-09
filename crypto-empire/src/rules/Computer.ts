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
import Information from "./information/Information";

export class Computer {

    name: string;
    tags: Tag[];
    location: Point;
    ai: AutoAction[] = [];
    files: Information[] = [];
    state: State;

    constructor(name : string, tags : Tag[], location: Point) {
        this.name = name;
        this.tags = tags;
        this.location = location;
    }


    addMenuOptions() : IContextMenuOption[] {
        let returnValue : IContextMenuOption[]  = [
            {
                caption: "Investigate",
                doWhat: () => {
                    showInformationModal(this.name, "<ul><li>This computer is named <b>" + this.name + "</b>.</li><li>It's <b>secure</b>: You cannot hack it.</li></ul>");
                }
            }
        ];
        if (this.tags.includes(Tag.FileServer)) {
            let downloadables : IContextMenuOption[] = [];
            for (let f of this.files) {
                downloadables.push({
                    caption: f.caption,
                    doWhat: () => {
                        this.state.download(f);
                    }
                })
            }

            returnValue.push({
                caption: "Download",
                submenu: downloadables
            })
        }

        return returnValue;
    }

    copy(newState : State) : Computer {
        let c : Computer = new Computer(this.name, this.tags, this.location);
        c.ai = this.ai;
        c.state = newState;
        for (let i of this.files) {
            c.files.push(i.copy(newState));
        }
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
                (aa as MessageReceivedAutoAction).action(m.message, state);
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

    static Mallory() {
        return new Computer("Mallory", [ Tag.You, Tag.ActiveAttacker ], Locations.Bottom);
    }

    static Headquarters() {
        return new Computer("Headquarters", [ Tag.Secure ], Locations.Bottomleft);
    }
}