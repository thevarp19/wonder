import { axios } from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/types/api";

export function login(values: LoginRequest) {
    return axios.post<LoginResponse>("/api/login/", values);
}
