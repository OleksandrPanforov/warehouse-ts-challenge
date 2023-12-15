import { PricedMaterials } from "../types/Articles";
import { Invoice } from "../types/Invoice";

export interface IInvoiceService {
    formInvoice(orderId: string, pricedArticles: Map<PricedMaterials, number>): Invoice;
}