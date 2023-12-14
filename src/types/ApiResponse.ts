import { HeatPump, InstallationMaterial, Tool } from "./Articles"
import { Order } from "./Order"

export type ApiResponse = {
    heatPumps: HeatPump[],
    installationMaterials: InstallationMaterial[],
    tools: Tool[],
    orders: Order[]
}