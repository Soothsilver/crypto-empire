import Point from "../rules/Point";
import ComputerIcon from "../components/ComputerIcon";

export default class Mathematics {
    private static lastUniqueId : number = 1;

    public static getUniqueId() : string {
        Mathematics.lastUniqueId++;
        return "uid" + Mathematics.lastUniqueId.toString();
    }

    static toCenterComputer(location: Point) : Point {
        return {
            x: location.x + ComputerIcon.WIDTH / 2,
            y: location.y + ComputerIcon.HEIGHT / 2
        };
    }

    static subtract(one: Point, two: Point) {
        return {
            x: one.x - two.x,
            y: one.y - two.y
        };
    }
}