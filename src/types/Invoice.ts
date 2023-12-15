import { PricedMaterials } from "./Articles";
type Invoice = { orderId: string, articles: Map<PricedMaterials, number>, price?: number }

export { Invoice }