import { useQuery } from "@tanstack/react-query";
import { getStoreBoxes } from "../box/api";
import { GetBoxResponse } from "../box/types";
import {
    getAvailableStores,
    getSellerStores,
    getStoreById,
    getStores,
    getStoreSellerById,
    getStoreSellerOwnById,
} from "./api";
import {
    GetAvailableStoreResponse,
    GetDetailSellerOwnStoreResponse,
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
export const useGetAvailableStores = () => {
    return useQuery<GetAvailableStoreResponse[]>({
        queryKey: ["stores-available"],
        queryFn: async () => {
            const { data } = await getAvailableStores();
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
export const useGetDetailedSellerOwnStores = (id: number) => {
    return useQuery<GetDetailSellerOwnStoreResponse>({
        queryKey: ["store-seller-own", id],
        queryFn: async () => {
            const { data } = await getStoreSellerOwnById(id);
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

export const useGetStoreBoxes = (id: number) => {
    return useQuery<GetBoxResponse[]>({
        queryKey: ["storeBox", id],
        queryFn: async () => {
            const { data } = await getStoreBoxes(id);
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

export const useGetSellerStore = (id: number | null) => {
    return useQuery<GetDetailSellerStoreResponse>({
        queryKey: [`store`, id],

        queryFn: async () => {
            const { data } = await getStoreSellerById(id || -1);
            return data;
        },
        enabled: id !== null,
    });
};
