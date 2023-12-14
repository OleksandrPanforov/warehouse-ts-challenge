import { HeatPump, InstallationMaterial, Article, PricedMaterials, Tool } from "../types/Articles";
import { IPackageService } from "./IPackageService";

export class PackageService implements IPackageService {
    packPumps(orderArticles: string[], heatPumps: HeatPump[]): HeatPump[] {
        return this.findArticles(orderArticles, heatPumps) as HeatPump[];
    }

    packMaterials(orderArticles: string[], installationMaterials: InstallationMaterial[]): InstallationMaterial[] {
        return this.findArticles(orderArticles, installationMaterials) as InstallationMaterial[];
    }

    packTools(orderArticles: string[], tools: Tool[]): Tool[] {
        return this.findArticles(orderArticles, tools) as Tool[];
    }
    
    mapPricedArticles(storageArticles: Article[]): Map<PricedMaterials, number> {
        throw new Error("Method not implemented.");
    }

    private findArticles(orderArticles: string[], storageArticles: Article[]) {
        return orderArticles.map(tool => storageArticles.find(article => article.id === tool)).filter(article => article);
    }

}