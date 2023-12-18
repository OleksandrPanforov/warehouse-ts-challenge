import { ApiResponse } from '../types/ApiResponse.js';
import { HeatPump, InstallationMaterial, Tool } from '../types/Articles.js';
import { Order } from '../types/Order.js';
import { IDataService } from './IDataService.js';

export class RestDataService implements IDataService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getData(): Promise<ApiResponse> {
    const orders = await fetch(`${this.baseUrl}/orders`)
      .then((response) => response.json())
      .then((body) => body as Order[]);
    const heatPumps = await fetch(`${this.baseUrl}/heatPumps`)
      .then((response) => response.json())
      .then((body) => body as HeatPump[]);
    const installationMaterials = await fetch(`${this.baseUrl}/installationMaterials`)
      .then((response) => response.json())
      .then((body) => body as InstallationMaterial[]);
    const tools = await fetch(`${this.baseUrl}/tools`)
      .then((response) => response.json())
      .then((body) => body as Tool[]);

    return {
      orders, heatPumps, installationMaterials, tools,
    } as ApiResponse;
  }
}
