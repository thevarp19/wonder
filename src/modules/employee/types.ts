export interface GetEmployee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

export interface CreateEmployeeRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
}

export interface UpdateEmployeeRequest {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

export interface CreateEmployeeResponse {
    email: string;
    password: string;
}

export interface UpdateEmployeePassword {
    password: string;
}
