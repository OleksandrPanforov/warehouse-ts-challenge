import { HeatPump, InstallationMaterial, Tool } from './Articles.js';
import { Order } from './Order.js';

export type ApiResponse = {
  heatPumps: HeatPump[],
  installationMaterials: InstallationMaterial[],
  tools: Tool[],
  orders: Order[]
};
