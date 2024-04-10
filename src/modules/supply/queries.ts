import { useQuery } from "@tanstack/react-query";
import { getSuppliesByDate, getSupplyById } from "./api";
import { GetSuppliesByDate, GetSupplyById } from "./types";

export const useGetSuppliesByDate = (startDate: string, endDate: string) => {
    return useQuery<GetSuppliesByDate[]>({
        queryKey: ["supplies", startDate, endDate],
        queryFn: async () => {
            const { data } = await getSuppliesByDate(startDate, endDate);
            return data;
        },
    });
};

export const useGetSupply = (id: number) => {
    return useQuery<GetSupplyById[]>({
        queryKey: [`store`, id],
        queryFn: async () => {
            const { data } = await getSupplyById(id);
            return data;
        },
    });
};
