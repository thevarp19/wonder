import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api";
import { GetProductResponse } from "./types";

export const useGetProducts = (page: number = 0, size: number = 10) => {
    return useQuery<GetProductResponse>({
        queryKey: [`products`, page, size],
        queryFn: async () => {
            const { data } = await getProducts(page, size);
            return data;
        },
    });
};
