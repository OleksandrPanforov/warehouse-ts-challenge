import { PricedMaterials } from "./Articles"

type Restocking = { orderId: string, articles?: Map<PricedMaterials, number> }

export { Restocking }