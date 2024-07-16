import { useQuery } from "@tanstack/react-query";
import { getAllBoxes, getBoxes, getStoreBoxes } from "./api";
import { GetBoxResponse } from "./types";

export const useGetBoxes = (id: number | null) => {
    return useQuery<GetBoxResponse[]>({
        queryKey: ["boxes", id],
        queryFn: async () => {
            if (id === null) return [];
            const { data } = await getBoxes(id);
            return data;
        },
        enabled: id !== null,
    });
};

export const useGetAllBoxes = () => {
    return useQuery<GetBoxResponse[]>({
        queryKey: ["allBoxes"],
        queryFn: async () => {
            const { data } = await getAllBoxes();
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
