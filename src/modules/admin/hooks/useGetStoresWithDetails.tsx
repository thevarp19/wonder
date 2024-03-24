import { useQuery } from "@tanstack/react-query";
import { getStoresWithDetails } from "../api/shared";
import { GetStoresWithDetailsResponse } from "../types/api";

export const useGetStoresWithDetails = () => {
    return useQuery<GetStoresWithDetailsResponse[]>({
        queryKey: ["stores-with-details"],
        queryFn: async () => {
            const { data } = await getStoresWithDetails();
            return data;
        },
    });
};
