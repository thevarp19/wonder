import { axios } from "@/lib/axios";
import { SellerEmailConfirmRequest, SellerRegisterRequest } from "../types/api";

export function registerSeller(values: SellerRegisterRequest) {
    return axios.post("/api/register/", values);
}

export function confirmEmailSeller(values: SellerEmailConfirmRequest) {
    return axios.post("/api/register/confirm", values);
}
