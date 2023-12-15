'use strict';
import { IDataService } from "./services/IDataService";
import { IPackageService } from "./services/IPackageService";
import { JsonDataService } from "./services/JsonDataService";
import { PackageService } from "./services/PackageService";

import { Article, HeatPump, InstallationMaterial, Tool, PricedMaterials } from "./types/Articles";
import { Invoice } from "./types/Invoice";
import { Order } from "./types/Order";
import { Package } from "./types/Package";
import { Restocking } from "./types/Restocking";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataService: IDataService = new JsonDataService("../data-server/index");
const packageService: IPackageService = new PackageService();
const data = dataService.data;

readline.question("Pick an order id, or leave empty to process all", (id: string) => {
    if (id) {
        console.log(`Packing order ${id}`);
        const orderToPack: Order | undefined = data.orders.find(order => order.id === id);
        if (!orderToPack) {
            console.log(`Couldn't find order ${id}. Please, check the provided id.`)
        } else {
            displayOrder(pack(orderToPack));
        }
    } else {
        for (const order of data.orders) {
            console.log(`Packing order ${order.id}`);
            displayOrder(pack(order));
        }
    }
    readline.close();
});

function pack(orderToPack: Order): Package | undefined {
    const packagedOrder: Package = new Package(orderToPack.id);

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

    let restockableArticles: Map<PricedMaterials, number> = packageService.mapPricedArticles(packagePumps.concat(packageMaterials));
    let articlesToRestock: Array<PricedMaterials> = [];

    articlesToRestock = packageService.checkStock(restockableArticles);


    packageInvoice.articles = restockableArticles;

    let price: number = 0;
    for (let [article, count] of packageInvoice.articles) {
        price += article.unitPrice * count;
    }
    packageInvoice.price = +price.toFixed(2);

    packagedOrder.invoice = packageInvoice;

    let packageRestock: Restocking = { orderId: packagedOrder.orderId };

    packageRestock.articles = articlesToRestock;

    packagedOrder.restocking = packageRestock;
    return packagedOrder;
}

function displayOrder(packagedOrder: Package | undefined): void {
    if (packagedOrder) {
        console.log(packagedOrder);
    }
}

