import { PricedMaterials } from "../types/Articles";
import { Invoice } from "../types/Invoice";
import { IInvoiceService } from "./IInvoiceService";

export class InvoiceService implements IInvoiceService {
    public formInvoice(orderId: string, pricedArticles: Map<PricedMaterials, number>): Invoice {
        const packageInvoice: Invoice = { orderId, articles: pricedArticles };

        let price: number = 0;
        for (let [article, count] of packageInvoice.articles) {
            price += article.unitPrice * count;
        }
        packageInvoice.price = +price.toFixed(2);

        return packageInvoice;
    }
}