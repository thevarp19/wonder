import { axiosAuthorized } from "@/lib/axios";
import { GetServiceItemsResponse, UpdateServiceParamsRequest } from "./types";

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
