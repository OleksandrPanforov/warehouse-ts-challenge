import { PricedMaterials } from '../types/Articles.js';
import { Invoice } from '../types/Invoice.js';

export interface IInvoiceService {
  formInvoice(orderId: string, pricedArticles: Map<PricedMaterials, number>): Invoice;
}
