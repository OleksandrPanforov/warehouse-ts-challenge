import { PricedMaterials } from "./Articles.js"

type Restocking = {
    orderId: string,
    articles?: Map<PricedMaterials, number>
}

export { Restocking }