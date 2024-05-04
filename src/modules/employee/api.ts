import { axiosAuthorized } from "@/lib/axios";
import {
    CreateEmployeeRequest,
    CreateEmployeeResponse,
    GetEmployee,
    UpdateEmployeePassword,
    UpdateEmployeeRequest,
} from "./types";

export function getEmployees(storeId: number) {
    return axiosAuthorized.get<GetEmployee[]>(
        `/api/employees?storeId=${storeId}`
    );
}

export function getEmployeeById(userId: number) {
    return axiosAuthorized.get<GetEmployee>(`/api/employees/${userId}`);
}

export function createEmployee(data: CreateEmployeeRequest) {
    return axiosAuthorized.post<CreateEmployeeResponse>(`api/employees`, data);
}

export function deleteEmployee(userId: number) {
    return axiosAuthorized.delete(`/api/employees/${userId}`);
}

export function updateEmployee(userId: number, data: UpdateEmployeeRequest) {
    return axiosAuthorized.put(`/api/employees/${userId}`, data);
}

export function updateEmployeePassword(
    userId: number,
    data: UpdateEmployeePassword
) {
    return axiosAuthorized.patch(
        `/api/employees/update-password${userId}`,
        data
    );
}
