'use strict';
import { DataService } from "./services/dataService";
//  require("./types/data-server");

import { Article, HeatPump, InstallationMaterial, Tool, PricedMaterials } from "./types/Articles";
import { Invoice } from "./types/Invoice";
import { Order } from "./types/Order";
import { Package } from "./types/Package";
import { Restocking } from "./types/Restocking";

const restockSoonCount = 3;

let dataService: DataService = new DataService("../data-server/index");

var data = dataService.data;

function findArticles(orderArticles: string[], storageArticles: Article[]) {
    return orderArticles.map(tool => storageArticles.find(article => article.id === tool)).filter(article => article);
}

function countArticles(storageArticles: Article[]): Map<PricedMaterials, number> {
    const map: Map<PricedMaterials, number> = storageArticles.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    return map;
}



let orderToPack: Order = data.orders[4];
let packagedOrder: Package = { orderId: orderToPack.id };

let packageArticles: Article[] = [];
let packagePumps: HeatPump[];
let packageMaterials: InstallationMaterial[];
let packageTools: Tool[];

packagePumps = findArticles(orderToPack.articles, data.heatPumps) as HeatPump[];
packageArticles = packageArticles.concat(packagePumps);

packageMaterials = findArticles(orderToPack.articles, data.installationMaterials) as InstallationMaterial[];
packageArticles = packageArticles.concat(packageMaterials);

packageTools = findArticles(orderToPack.articles, data.tools) as Tool[];
packageArticles = packageArticles.concat(packageTools);

packagedOrder.orderArticles = { orderId: packagedOrder.orderId, articles: packageArticles };

let packageInvoice: Invoice = { orderId: packagedOrder.orderId };

let restockableArticles: Map<HeatPump | InstallationMaterial, number> = countArticles(packagePumps.concat(packageMaterials));

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

let articlesToRestock: Array<HeatPump | InstallationMaterial> = [];
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
