import { axios } from "@/lib/axios";
import { SellerRegisterRequest } from "../types/api";

export function registerSeller(values: SellerRegisterRequest) {
    return axios.post("/api/auth/registration", values);
}
