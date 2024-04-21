import { useQuery } from "@tanstack/react-query";
import { getCells } from "./api";
import { GetCellResponse } from "./types";

export const useGetCells = (storeId: number) => {
    return useQuery<GetCellResponse[]>({
        queryKey: [`cells-${storeId}`],
        queryFn: async () => {
            const { data } = await getCells(storeId);
            return data;
        },
    });
};
