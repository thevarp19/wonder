import { useQuery } from "@tanstack/react-query";
import { getBoxes } from "../api/shared";
import { GetBoxesResponse } from "../types/api";

export const useGetBoxes = () => {
    return useQuery<GetBoxesResponse[]>({
        queryKey: ["boxes"],
        queryFn: async () => {
            const { data } = await getBoxes();
            return data;
        },
    });
};
