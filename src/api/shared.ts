import { axiosAuthorized } from "@/lib/axios";
import { CityResponse } from "@/types/api";

export async function getCities() {
    return axiosAuthorized.get<CityResponse[]>("/api/cities");
}
