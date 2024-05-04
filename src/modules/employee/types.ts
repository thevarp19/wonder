export interface GetEmployee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    storeId: number;
}

export interface CreateEmployeeRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    storeId: number;
}

export interface UpdateEmployeeRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    storeId: number;
}

export interface CreateEmployeeResponse {
    email: string;
    password: string;
}

export interface UpdateEmployeePassword {
    oldPassword: string;
    newPassword: string;
}
