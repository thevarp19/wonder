import { GetStoresResponse } from "@/roles/admin/types/api";
import { useQuery } from "@tanstack/react-query";
import { getStoreById, getStores } from "./api";

export const useGetStores = () => {
    return useQuery<GetStoresResponse[]>({
        queryKey: ["stores"],
        queryFn: async () => {
            const { data } = await getStores();
            return data;
        },
    });
};

export const useGetStore = (id: string) => {
    return useQuery<GetStoresResponse>({
        queryKey: [`store`, id],
        queryFn: async () => {
            const { data } = await getStoreById(id);
            return data;
        },
    });
};
