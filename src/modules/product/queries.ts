import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api";
import { GetProductResponse } from "./types";

export const useGetProducts = () => {
    return useQuery<GetProductResponse[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await getProducts();
            return data;
        },
    });
};
