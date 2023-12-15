import { HeatPump, InstallationMaterial, Article, PricedMaterials, Tool } from "../types/Articles";
import { error, warning } from "../utilities/logging";
import { IPackageService } from "./IPackageService";

export class PackageService implements IPackageService {
    
    private _restockSoonCount : number = 3;
    public get restockSoonCount() : number {
        return this._restockSoonCount;
    }
    public set restockSoonCount(v : number) {
        this._restockSoonCount = v;
    }
    
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
        const map: Map<PricedMaterials, number> = storageArticles.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        return map;
    }

    checkStock(restockableArticles: Map<PricedMaterials, number>): PricedMaterials[] {
        const articlesToRestock: Array<PricedMaterials> = [];
        for (let [article, count] of restockableArticles) {
            if (article.stock - count < 0) {
                error(`Insufficent amount of ${article.name}. Order can't be fulfilled.`);
            } else if (article.stock - count == 0) {
                articlesToRestock?.push(article);
                warning(`${article.name} is the last item in stock. Listed for restocking.`);
            } else if (article.stock - count <= this._restockSoonCount) {
                warning(`${article.name} stock after the order will be less than ${this._restockSoonCount}. Be sure to restock soon!`);
            }
        }
        return articlesToRestock;
    }

    private findArticles(orderArticles: string[], storageArticles: Article[]) {
        return orderArticles.map(tool => storageArticles.find(article => article.id === tool)).filter(article => article);
    }
}