import Point from "../rules/Point";
import LevelDefinition from "../levels/LevelDefinition";
import {levels} from "../levels/Campaign";

export function showInformationModal(caption : string, text : string) {
    $("#infoheader").text(caption);
    $("#infotext").html(text);
    $("#myModal").modal();
}
export function $id(id : string): JQuery<HTMLElement> {
    return $("#" + id);
}
export function findMidwayPoint(one: Point, two: Point) {
    return {
        x: (one.x + two.x) / 2,
        y: (one.y + two.y) / 2
    };
}

export function getFollowingLevel(levelDefinition: LevelDefinition) : LevelDefinition | undefined {
    let stopnow : boolean = false;
    for (let ld of levels) {
        if (stopnow) {
            return ld;
        }
        if (ld == levelDefinition) {
            stopnow = true;
        }
    }
    return undefined;
}
export function prettifyMessage(fulltext: string) {
    return fulltext.replace(/\n/g, "<br>");
}