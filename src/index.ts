import * as readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
import { DisplayService } from './services/DisplayService.js';
import { IDataService } from './services/IDataService.js';
import { IDisplayService } from './services/IDisplayService.js';
import { IInvoiceService } from './services/IInvoiceService.js';
import { IPackageService } from './services/IPackageService.js';
import { InvoiceService } from './services/InvoiceService.js';
import { PackageService } from './services/PackageService.js';
import { RestDataService } from './services/RestDataService.js';

import { Order } from './types/Order.js';
import { error, highlight } from './utilities/loggingFormat.js';

const rl = readline.createInterface({ input, output });

const dataService: IDataService = new RestDataService('http://localhost:3000');
const displayService: IDisplayService = new DisplayService();
const invoiceService: IInvoiceService = new InvoiceService();
const packageService: IPackageService = new PackageService(invoiceService);
const data = await dataService.getData();

const id = await new Promise((resolve) => {
  rl.question('Pick an order id, or leave empty to process all: ', resolve);
});
if (id) {
  const ordersToPack: Order[] | undefined = data.orders.filter((order: Order) => order.id === id);
  if (!ordersToPack) {
    console.log(error(`Couldn't find order ${id}. Please, check the provided id.`));
  } else {
    packOrders(ordersToPack);
  }
} else {
  packOrders(data.orders);
}

rl.close();

function packOrders(ordersToPack: Order[]) {
  console.log(highlight(`Found ${ordersToPack.length} orders.`));
  for (const order of ordersToPack) {
    console.log(highlight(`Packing order: ${order.id}`));
    const packedOrder = packageService.pack(order, data);
    displayService.displayPackage(packedOrder);
  }
}
