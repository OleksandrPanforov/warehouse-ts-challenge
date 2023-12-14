import { Invoice } from "./Invoice"
import { OrderArticles } from "./Order"
import { Restocking } from "./Restocking"

export class Package {
    private _orderId: string;
    private _orderArticles?: OrderArticles | undefined;
    private _invoice?: Invoice | undefined;
    private _restocking?: Restocking | undefined;
    private _warnings?: string[] | undefined;
    
    public get orderId(): string {
        return this._orderId;
    }
    public set orderId(value: string) {
        this._orderId = value;
    }
    public get orderArticles(): OrderArticles | undefined {
        return this._orderArticles;
    }
    public set orderArticles(value: OrderArticles | undefined) {
        this._orderArticles = value;
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

    constructor(orderId: string) {
        this._orderId = orderId;
    }
}
