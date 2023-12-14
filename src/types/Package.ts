import { Invoice } from "./Invoice"
import { OrderArticles } from "./Order"
import { Restocking } from "./Restocking"

type Package = {
    orderId: string,
    orderArticles?: OrderArticles,
    invoice?: Invoice,
    restocking?: Restocking,
    warnings?: string[],
}

export { Package }