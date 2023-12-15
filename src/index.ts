'use strict';
import { DisplayService } from "./services/DisplayService";
import { IDataService } from "./services/IDataService";
import { IDisplayService } from "./services/IDisplayService";
import { IInvoiceService } from "./services/IInvoiceService";
import { IPackageService } from "./services/IPackageService";
import { InvoiceService } from "./services/InvoiceService";
import { JsonDataService } from "./services/JsonDataService";
import { PackageService } from "./services/PackageService";

import { Order } from "./types/Order";
import { error, highlight } from "./utilities/loggingFormat";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataService: IDataService = new JsonDataService("../data-server/index");
const displayService: IDisplayService = new DisplayService();
const invoiceService: IInvoiceService = new InvoiceService();
const packageService: IPackageService = new PackageService(invoiceService);
const data = dataService.data;

readline.question("Pick an order id, or leave empty to process all: ", (id: string) => {
    if (id) {
        const ordersToPack: Order[] | undefined = data.orders.filter(order => order.id === id);
        if (!ordersToPack) {
            console.log(error(`Couldn't find order ${id}. Please, check the provided id.`))
        } else {
            packOrders(ordersToPack);
        }
    } else {
        packOrders(data.orders);
    }
    readline.close();
});

function packOrders(ordersToPack: Order[]) {
    console.log(highlight(`Found ${ordersToPack.length} orders.`));
    for (const order of ordersToPack) {
        console.log(highlight(`Packing order: ${order.id}`));
        const packedOrder = packageService.pack(order, data);
        displayService.displayPackage(packedOrder);
    }
}

