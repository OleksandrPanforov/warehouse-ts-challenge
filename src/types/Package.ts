import { error, highlight, success, warning } from "../utilities/logging";
import { HeatPump, InstallationMaterial, Tool } from "./Articles";
import { Invoice } from "./Invoice"
import { Restocking } from "./Restocking"

export class Package {
    private _orderId: string;
    private _heatPumps?: HeatPump[] | undefined;
    private _installationMaterials?: InstallationMaterial[] | undefined;
    private _tools?: Tool[] | undefined;
    private _invoice?: Invoice | undefined;
    private _restocking?: Restocking | undefined;
    private _warnings?: string[] | undefined;
    private _installationDate: Date;

    public get orderId(): string {
        return this._orderId;
    }
    public set orderId(value: string) {
        this._orderId = value;
    }
    public get heatPumps(): HeatPump[] | undefined {
        return this._heatPumps;
    }
    public set heatPumps(value: HeatPump[] | undefined) {
        this._heatPumps = value;
    }
    public get installationMaterials(): InstallationMaterial[] | undefined {
        return this._installationMaterials;
    }
    public set installationMaterials(value: InstallationMaterial[] | undefined) {
        this._installationMaterials = value;
    }
    public get tools(): Tool[] | undefined {
        return this._tools;
    }
    public set tools(value: Tool[] | undefined) {
        this._tools = value;
    }
    public get invoice(): Invoice | undefined {
        return this._invoice;
    }
    public set invoice(value: Invoice | undefined) {
        this._invoice = value;
    }
    public get restocking(): Restocking | undefined {
        return this._restocking;
    }
    public set restocking(value: Restocking | undefined) {
        this._restocking = value;
    }
    public get warnings(): string[] | undefined {
        return this._warnings;
    }
    public set warnings(value: string[] | undefined) {
        this._warnings = value;
    }

    public get installationDate(): Date {
        return this._installationDate;
    }
    public set installationDate(v: Date) {
        this._installationDate = v;
    }


    constructor(orderId: string, installationDate: Date) {
        this._orderId = orderId;
        this._installationDate = installationDate;
    }

    public toString = (): string => {
        return `${success(`Package summary for order ${this.orderId}`)}
        +-------------------------+----------------------------------------+
        | ${highlight('Installation date:')}      
        | ${this._installationDate}
        +-------------------------+----------------------------------------+
        ${this.invoiceDisplay()}
        +-------------------------+----------------------------------------+
        ${this.toolsDisplay()}
        +-------------------------+----------------------------------------+
        ${this.restocking?.articles ? this.restockingDisplay() : ""}
        `
    }

    private invoiceDisplay(): string {
        let result: string = `| ${highlight('Package invoice:')}\r\n`;
        for (let [article, count] of this.invoice?.articles ?? []) {
            result += `        | ${article.name} (${article.productCode}), ${count} piece(s), priced at ${article.unitPrice} with total of ${(count * article.unitPrice).toFixed(2)};\r\n`;
        }
        result += `        | ${highlight('Total price is:')} ${this.invoice?.price}`;
        return result;
    }

    private toolsDisplay(): string {
        let result: string = `| ${highlight('Tools in package:')}\r\n`;
        for (let tool of this.tools ?? []) {
            result += `        | ${tool.name} (${tool.productCode});\r\n`;
        }
        result += "        |"
        return result;
    }

    private restockingDisplay(): string {
        let result: string = `| ${warning('Please, pay attention to items that need to be restocked:')}\r\n`;
        for (let [article, count] of this.restocking?.articles ?? []) {
            result += `        | ${article.name} (${article.productCode}), ${count} piece(s) required with stock of ${article.stock}.\r\n`;
            (count - article.stock) == 0
                ? result += `        | ${warning('Item stock is empty')};\r\n`
                : result += `        | ${error(`Lacking ${count - article.stock} piece(s)`)};\r\n`;
        }
        return result;
    }

}
