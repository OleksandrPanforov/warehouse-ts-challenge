import { Package } from "../types/Package";

export interface IDisplayService {
    displayPackage(toDisplay: Package): void;
}