import { ApiResponse } from "../types/ApiResponse.js";

export interface IDataService {
    getData(): Promise<ApiResponse>;
}