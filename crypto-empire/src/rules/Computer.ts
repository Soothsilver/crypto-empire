import {Tag} from "./Tag";

export class Computer {
    private name: string;
    private tags: Tag[];

    constructor(name : string, tags : Tag[]) {
        this.name = name;
        this.tags = tags;
    }
}