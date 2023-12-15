import { HeatPump, InstallationMaterial, Tool } from "./Articles";
import { Invoice } from "./Invoice"
import { Restocking } from "./Restocking"

export class Package {
    public readonly orderId: string;
    public readonly installationDate: Date;
    public heatPumps?: HeatPump[] | undefined;
    public installationMaterials?: InstallationMaterial[] | undefined;
    public tools?: Tool[] | undefined;
    public invoice?: Invoice | undefined;
    public restocking?: Restocking | undefined;
    public warnings?: string[] | undefined;


    constructor(orderId: string, installationDate: Date) {
        this.orderId = orderId;
        this.installationDate = installationDate;
    }
}
