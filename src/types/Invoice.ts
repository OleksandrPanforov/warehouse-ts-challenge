import { PricedMaterials } from "./Articles";
import { OrderArticles } from "./Order";

type Invoice = Pick<OrderArticles, "orderId">
    & { articles?: Map<PricedMaterials, number>, price?: number }

export { Invoice }