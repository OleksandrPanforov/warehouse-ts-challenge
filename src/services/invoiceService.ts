import { PricedMaterials } from '../types/Articles.js';
import { Invoice } from '../types/Invoice.js';
import { IInvoiceService } from './IInvoiceService.js';

export class InvoiceService implements IInvoiceService {
  public formInvoice(orderId: string, pricedArticles: Map<PricedMaterials, number>): Invoice {
    const packageInvoice: Invoice = { orderId, articles: pricedArticles };

    let price: number = 0;
    for (const [article, count] of packageInvoice.articles) {
      price += article.unitPrice * count;
    }
    packageInvoice.price = +price.toFixed(2);

    return packageInvoice;
  }
}
