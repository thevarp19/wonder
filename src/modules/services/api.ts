import { axios, axiosAuthorized } from "@/lib/axios";
import {
    CalculatorRequest,
    CalculatorResponse,
    GetSellerProductsSizes,
    GetServiceItemsResponse,
    UpdateServiceParamsRequest,
} from "./types";

export function getServiceParams(
    page: number = 0,
    size: number = 10,
    search: string = ""
) {
    return axiosAuthorized.get<GetServiceItemsResponse>(
        `/api/seller-product/service-parameters/?page=${page}&size=${size}&search=${search}`
    );
}

export function updateServiceParams(
    id: number,
    values: UpdateServiceParamsRequest
) {
    return axiosAuthorized.patch(
        `/api/seller-product/service-parameters/${id}/`,
        values
    );
}
export function calculateParams(values: CalculatorRequest[]) {
    return axios.post<CalculatorResponse[]>(
        `/api/service/calculate/v2/`,
        values
    );
}
export async function getSellerProductsWithSizes({
    pageParam = 1,
    pageSize = 10,
    searchValue = "",
}) {
    let url = `/api/product/seller/sizes/?page=${pageParam}&size=${pageSize}&search=${searchValue}`;
    const { data } = await axiosAuthorized.get<GetSellerProductsSizes>(url);
    return data;
}
