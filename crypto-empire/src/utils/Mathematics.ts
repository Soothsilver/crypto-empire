export default class Mathematics {
    private static lastUniqueId : number = 1;

    public static getUniqueId() : string {
        Mathematics.lastUniqueId++;
        return Mathematics.lastUniqueId.toString();
    }
}