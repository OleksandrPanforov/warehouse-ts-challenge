'use strict';
import { IDataService } from "./services/IDataService";
import { IPackageService } from "./services/IPackageService";
import { JsonDataService } from "./services/JsonDataService";
import { PackageService } from "./services/PackageService";
//  require("./types/data-server");

import { Article, HeatPump, InstallationMaterial, Tool, PricedMaterials } from "./types/Articles";
import { Invoice } from "./types/Invoice";
import { Order } from "./types/Order";
import { Package } from "./types/Package";
import { Restocking } from "./types/Restocking";

const restockSoonCount = 3;

const dataService: IDataService = new JsonDataService("../data-server/index");
const packageService: IPackageService = new PackageService();
const data = dataService.data;

function countArticles(storageArticles: Article[]): Map<PricedMaterials, number> {
    const map: Map<PricedMaterials, number> = storageArticles.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    return map;
}



let orderToPack: Order = data.orders[4];
let packagedOrder: Package = new Package(orderToPack.id);

let packageArticles: Article[] = [];
let packagePumps: HeatPump[];
let packageMaterials: InstallationMaterial[];
let packageTools: Tool[];

packagePumps = packageService.packPumps(orderToPack.articles, data.heatPumps);
packageMaterials = packageService.packMaterials(orderToPack.articles, data.installationMaterials);
packageTools = packageService.packTools(orderToPack.articles, data.tools);

packageArticles = packageArticles.concat(packagePumps);
packageArticles = packageArticles.concat(packageMaterials);
packageArticles = packageArticles.concat(packageTools);


packagedOrder.orderArticles = { orderId: packagedOrder.orderId, articles: packageArticles };

let packageInvoice: Invoice = { orderId: packagedOrder.orderId };

let restockableArticles: Map<PricedMaterials, number> = countArticles(packagePumps.concat(packageMaterials));

for (let [article, count] of restockableArticles) {
    if (article.stock - count < 0) {
        console.log(`Insufficent amount of ${article.name}. Can't proceed with the order.`)
    }
}

packageInvoice.articles = restockableArticles;

let price: number = 0;
for (let [article, count] of packageInvoice.articles) {
    price += article.unitPrice * count;
}
packageInvoice.price = +price.toFixed(2);

packagedOrder.invoice = packageInvoice;

let packageRestock: Restocking = { orderId: packagedOrder.orderId };

let articlesToRestock: Array<PricedMaterials> = [];
for (let [article, count] of packageInvoice.articles) {
    if (article.stock - count == 0) {
        articlesToRestock?.push(article);
    }
    if (article.stock - count <= restockSoonCount) {
        console.log(`${article.name} stock after the order will be less than ${restockSoonCount}. Be sure to restock soon!`)
    }
}

packageRestock.articles = articlesToRestock;

packagedOrder.restocking = packageRestock;

console.log(packagedOrder);
