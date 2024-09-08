import { axiosAuthorized } from "@/lib/axios";
import {
    GetEmployeeReports,
    GetEmployeeReportsContent,
    GetEmployeeStores,
} from "./types";

export function getEmployeeReports(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    min_date: string = "",
    max_date: string = ""
    // deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetEmployeeReports>(
        `/api/zammler-check/?page=${page}&size=${size}&search=${searchValue}&min_date=${min_date}&max_date=${max_date}`
    );
}
export function createReportEmployee(formData: FormData) {
    return axiosAuthorized.post(`/api/zammler-check/`, formData);
}
export function updateReportEmployee(reportId: string, formData: FormData) {
    return axiosAuthorized.patch(`/api/zammler-check/${reportId}/`, formData);
}
export function getEmployeeStores() {
    return axiosAuthorized.get<GetEmployeeStores>(`/api/sellers/stores/`);
}
export function getEmployeeReportById(id: string) {
    return axiosAuthorized.get<GetEmployeeReportsContent>(
        `/api/zammler-check/${id}/`
    );
}
