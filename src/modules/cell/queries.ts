import { useQuery } from "@tanstack/react-query";
import { GetCellResponse } from "./types";

const mocks = [
    {
        id: 1,
        storeId: 1,
        row: 1,
        column: 1,
        number: 1,
    },
    {
        id: 2,
        storeId: 1,
        row: 1,
        column: 2,
        number: 2,
    },
];

export const useGetCells = (storeId: number) => {
    return useQuery<GetCellResponse[]>({
        queryKey: ["cells"],
        queryFn: async () => {
            // const { data } = await getCells(storeId);
            // return data;
            storeId;
            return mocks;
        },
    });
};
