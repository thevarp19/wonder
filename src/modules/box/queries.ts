import { useQuery } from "@tanstack/react-query";
import { getBoxes } from "./api";
import { GetBoxResponse } from "./types";

export const useGetBoxes = (id: number) => {
    return useQuery<GetBoxResponse[]>({
        queryKey: ["boxes", id],
        queryFn: async () => {
            const { data } = await getBoxes(id);
            return data;
        },
    });
};
