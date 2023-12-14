import { PricedMaterials } from "./Articles"
import { OrderArticles } from "./Order"

type Restocking = Pick<OrderArticles, "orderId"> & { articles?: Array<PricedMaterials> }

export { Restocking }