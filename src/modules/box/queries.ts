import { useQuery } from "@tanstack/react-query";

import { getAllBoxes, getStoreBoxes } from "./api";
import { GetBoxResponse } from "./types";

export const useGetBoxes = (id: number | null) => {
    return useQuery<GetBoxResponse[]>({
        queryKey: ["boxes", id],
        queryFn: async () => {
            if (id === null) return [];
            const { data } = await getStoreBoxes(id);
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
