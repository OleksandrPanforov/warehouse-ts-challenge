import { ApiResponse } from "../types/ApiResponse";
import { IDataService } from "./IDataService";

export class JsonDataService implements IDataService {

    private _data: ApiResponse;
    public get data(): ApiResponse {
        return this._data;
    }
    public set data(v: ApiResponse) {
        this._data = v;
    }

    /**
     * Get the data from API
     */
    constructor(apiPath: string) {
        this._data = require(apiPath)();
    }
}