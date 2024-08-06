import { useQuery } from "@tanstack/react-query";
import { getServiceParams } from "./api";
import { GetServiceItemsResponse } from "./types";

export const useGetServiceParams = (
    page: number = 1,
    size: number = 5,
    search: string = ""
) => {
    return useQuery<GetServiceItemsResponse>({
        queryKey: [`serviceParams`, page, size],
        queryFn: async () => {
            const { data } = await getServiceParams(page, size, search);
            return data;
        },
    });
};
