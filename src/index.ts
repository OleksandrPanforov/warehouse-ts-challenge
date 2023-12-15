'use strict';
import { IDataService } from "./services/IDataService";
import { IPackageService } from "./services/IPackageService";
import { JsonDataService } from "./services/JsonDataService";
import { PackageService } from "./services/PackageService";
import { InvoiceService } from "./services/InvoiceService";

import { PricedMaterials } from "./types/Articles";
import { Order } from "./types/Order";
import { Package } from "./types/Package";
import { IInvoiceService } from "./services/IInvoiceService";
import { error, highlight } from "./utilities/logging";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataService: IDataService = new JsonDataService("../data-server/index");
const packageService: IPackageService = new PackageService();
const invoiceService: IInvoiceService = new InvoiceService();
const data = dataService.data;

readline.question("Pick an order id, or leave empty to process all: ", (id: string) => {
    if (id) {
        const ordersToPack: Order[] | undefined = data.orders.filter(order => order.id === id);
        if (!ordersToPack) {
            console.log(error(`Couldn't find order ${id}. Please, check the provided id.`))
        } else {
            console.log(highlight(`Found ${ordersToPack.length} orders.`));
            for (const order of ordersToPack) {
                console.log(highlight(`Packing order: ${order.id}`));
                console.log(pack(order)?.toString());
            }
        }
    } else {
        for (const order of data.orders) {
            console.log(highlight(`Packing order: ${order.id}`));
            console.log(pack(order)?.toString());
        }
    }
    readline.close();
});


function pack(orderToPack: Order): Package | undefined {
    const packagedOrder: Package = new Package(orderToPack.id, orderToPack.installationDate);

    packagedOrder.heatPumps = packageService.packPumps(orderToPack.articles, data.heatPumps);;
    packagedOrder.installationMaterials = packageService.packMaterials(orderToPack.articles, data.installationMaterials);
    packagedOrder.tools = packageService.packTools(orderToPack.articles, data.tools);

    let pricedMaterials: Map<PricedMaterials, number> = packageService.mapPricedArticles(packagedOrder.heatPumps.concat(packagedOrder.installationMaterials));
    let articlesToRestock: Map<PricedMaterials, number> = packageService.checkStock(pricedMaterials);

    packagedOrder.invoice = invoiceService.FormInvoice(orderToPack.id, pricedMaterials);

    packagedOrder.restocking = { orderId: packagedOrder.orderId, articles: articlesToRestock };

    return packagedOrder;
}
