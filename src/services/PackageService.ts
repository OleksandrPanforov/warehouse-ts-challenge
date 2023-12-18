import { ApiResponse } from '../types/ApiResponse.js';
import {
  HeatPump, InstallationMaterial, Article, PricedMaterials, Tool,
} from '../types/Articles.js';
import { Order } from '../types/Order.js';
import { Package } from '../types/Package.js';
import { IInvoiceService } from './IInvoiceService.js';
import { IPackageService } from './IPackageService.js';

export class PackageService implements IPackageService {
  constructor(private _invoiceService: IInvoiceService) {
  }

  public pack(orderToPack: Order, data: ApiResponse): Package {
    const packagedOrder: Package = new Package(orderToPack.id, orderToPack.installationDate);

    packagedOrder.heatPumps = this.packPumps(orderToPack.articles, data.heatPumps);
    packagedOrder.installationMaterials = this.packMaterials(orderToPack.articles, data.installationMaterials);
    packagedOrder.tools = this.packTools(orderToPack.articles, data.tools);

    const pumpsAndMaterials = packagedOrder.heatPumps.concat(packagedOrder.installationMaterials);
    const pricedMaterials: Map<PricedMaterials, number> = this.mapPricedArticles(pumpsAndMaterials);

    const articlesToRestock: Map<PricedMaterials, number> = this.checkStock(pricedMaterials);

    packagedOrder.invoice = this._invoiceService.formInvoice(orderToPack.id, pricedMaterials);

    packagedOrder.restocking = {
      orderId: packagedOrder.orderId,
      articles: articlesToRestock,
    };

    return packagedOrder;
  }

  private checkStock(restockableArticles: Map<PricedMaterials, number>): Map<PricedMaterials, number> {
    const articlesToRestock: Map<PricedMaterials, number> = new Map<PricedMaterials, number>();
    for (const [article, count] of restockableArticles) {
      const remainingStock: number = article.stock - count;
      if (remainingStock <= 0) {
        articlesToRestock.set(article, count);
      }
    }
    return articlesToRestock;
  }

  private packPumps(orderArticles: string[], heatPumps: HeatPump[]): HeatPump[] {
    return this.findArticles(orderArticles, heatPumps) as HeatPump[];
  }

  private packMaterials(orderArticles: string[], installationMaterials: InstallationMaterial[]): InstallationMaterial[] {
    return this.findArticles(orderArticles, installationMaterials) as InstallationMaterial[];
  }

  private packTools(orderArticles: string[], tools: Tool[]): Tool[] {
    return this.findArticles(orderArticles, tools) as Tool[];
  }

  private mapPricedArticles(storageArticles: Article[]): Map<PricedMaterials, number> {
    const map: Map<PricedMaterials, number> = storageArticles.reduce(
      (acc, article) => acc.set(article, (acc.get(article) || 0) + 1),
      new Map(),
    );
    return map;
  }

  private findArticles(orderArticles: string[], storageArticles: Article[]) {
    return orderArticles
      .map((tool) => storageArticles.find((article) => article.id === tool))
      .filter((article) => article);
  }
}
