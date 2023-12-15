import { Package } from "../types/Package.js";

export interface IDisplayService {
    displayPackage(toDisplay: Package): void;
}