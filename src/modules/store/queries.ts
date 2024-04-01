import { useQuery } from "@tanstack/react-query";
import { getStoreById, getStores } from "./api";
import { GetStoreResponse } from "./types";

export const useGetStores = () => {
    return useQuery<GetStoreResponse[]>({
        queryKey: ["stores"],
        queryFn: async () => {
            const { data } = await getStores();
            return data;
        },
    });
};

export const useGetStore = (id: number) => {
    return useQuery<GetStoreResponse>({
        queryKey: [`store`, id],
        queryFn: async () => {
            const { data } = await getStoreById(id);
            return data;
        },
    });
};
