import { Article, HeatPump, InstallationMaterial, PricedMaterials, Tool } from "../types/Articles";

export interface IPackageService {
    packPumps(orderArticles: string[], heatPumps: HeatPump[]): HeatPump[]
    packMaterials(orderArticles: string[], heatPumps: InstallationMaterial[]): InstallationMaterial[]
    packTools(orderArticles: string[], heatPumps: Tool[]): Tool[]

    mapPricedArticles(storageArticles: Article[]): Map<PricedMaterials, number>;
}