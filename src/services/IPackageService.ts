import { Article, HeatPump, InstallationMaterial, PricedMaterials, Tool } from "../types/Articles";

export interface IPackageService {
    restockSoonCount: number;
    
    packPumps(orderArticles: string[], heatPumps: HeatPump[]): HeatPump[]
    packMaterials(orderArticles: string[], heatPumps: InstallationMaterial[]): InstallationMaterial[]
    packTools(orderArticles: string[], heatPumps: Tool[]): Tool[]

    mapPricedArticles(storageArticles: Article[]): Map<PricedMaterials, number>;
    checkStock(restockableArticles: Map<PricedMaterials, number>):Array<PricedMaterials>;
}