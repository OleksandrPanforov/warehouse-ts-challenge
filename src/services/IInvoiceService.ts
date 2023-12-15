import { PricedMaterials } from "../types/Articles";
import { Invoice } from "../types/Invoice";

export interface IInvoiceService {
    FormInvoice(orderId: string, pricedArticles: Map<PricedMaterials, number>): Invoice;
}