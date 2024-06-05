import { axiosAuthorized } from "@/lib/axios";
import { GetSalesInfoResponse } from "./types";

export function getSalesInfo(duration: string) {
    return axiosAuthorized.get<GetSalesInfoResponse>(
        `/api/statistics/sales-information/admin-stats?duration=${duration}`
    );
}
