import { axios } from "@/lib/axios";
import {
    LoginRequest,
    LoginResponse,
    SellerRegisterRequest,
    SellerRegisterResponse,
} from "./types";

export function login(values: LoginRequest) {
    return axios.post<LoginResponse>("/api/login/", values);
}

export function sellerRegister(values: SellerRegisterRequest) {
    return axios.post<SellerRegisterResponse>(
        "/api/sellers/registration/",
        values
    );
}
