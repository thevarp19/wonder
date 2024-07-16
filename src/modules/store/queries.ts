import { useQuery } from "@tanstack/react-query";
import {
    getSellerStores,
    getStoreById,
    getStores,
    getStoreSellerById,
} from "./api";
import {
    GetDetailSellerStoreResponse,
    GetDetailStoreResponse,
    GetStoreResponse,
    GetStoreSellerResponse,
} from "./types";

export const useGetStores = () => {
    return useQuery<GetStoreResponse[]>({
        queryKey: ["stores"],
        queryFn: async () => {
            const { data } = await getStores();
            return data;
        },
    });
};
export const useGetDetailedSellerStores = (id: number) => {
    return useQuery<GetDetailSellerStoreResponse>({
        queryKey: ["store-seller", id],
        queryFn: async () => {
            const { data } = await getStoreSellerById(id);
            return data;
        },
    });
};
export const useGetSellerStores = () => {
    return useQuery<GetStoreSellerResponse[]>({
        queryKey: ["stores-seller"],
        queryFn: async () => {
            const { data } = await getSellerStores();
            return data;
        },
    });
};

export const useGetStore = (id: number | null) => {
    return useQuery<GetDetailStoreResponse>({
        queryKey: [`store`, id],

        queryFn: async () => {
            const { data } = await getStoreById(id || -1);
            return data;
        },
        enabled: id !== null,
    });
};
