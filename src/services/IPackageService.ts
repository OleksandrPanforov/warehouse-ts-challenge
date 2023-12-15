import { ApiResponse } from "../types/ApiResponse.js";
import { Order } from "../types/Order.js";
import { Package } from "../types/Package.js";

export interface IPackageService {
    pack(orderToPack: Order, data: ApiResponse): Package;
}