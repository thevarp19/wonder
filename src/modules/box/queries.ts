import { useQuery } from "@tanstack/react-query";
import { getBoxes } from "./api";
import { GetBoxResponse } from "./types";

export const useGetBoxes = () => {
    return useQuery<GetBoxResponse[]>({
        queryKey: ["boxes"],
        queryFn: async () => {
            const { data } = await getBoxes();
            return data;
        },
    });
};
