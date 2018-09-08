import Information from "./Information";
import algoIcon from "../../images/algorithm.png";

export default abstract class Algorithm extends Information {


    getIcon(): string {
        return algoIcon;
    }

    getCssClass(): string {
        return "algorithm";
    }
}