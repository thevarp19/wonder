import { axiosAuthorized } from "@/lib/axios";
import {
    CreateEmployeeRequest,
    CreateEmployeeResponse,
    GetEmployee,
    UpdateEmployeePassword,
    UpdateEmployeeRequest,
} from "./types";

export function getEmployees(storeId: number) {
    return axiosAuthorized.get<GetEmployee[]>(`/api/employee/${storeId}/`);
}

export function getEmployeeById(userId: number) {
    return axiosAuthorized.get<GetEmployee>(`/api/employees/${userId}`);
}

export function createEmployee(data: CreateEmployeeRequest, storeId: number) {
    return axiosAuthorized.post<CreateEmployeeResponse>(
        `/api/employee/${storeId}/`,
        data
    );
}

export function deleteEmployee(userId: number) {
    return axiosAuthorized.delete(`/api/employee/detail/${userId}/`);
}

export function updateEmployee(userId: number, data: UpdateEmployeeRequest) {
    return axiosAuthorized.patch(`/api/employee/detail/${userId}/`, data);
}

export function changeEmployeePassword(
    userId: number,
    data: UpdateEmployeePassword
) {
    return axiosAuthorized.patch(`/api/employee/detail/${userId}/`, data);
}
