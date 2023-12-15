import { ApiResponse } from "../types/ApiResponse";
import { Order } from "../types/Order";
import { Package } from "../types/Package";

export interface IPackageService {
    pack(orderToPack: Order, data: ApiResponse): Package;
}