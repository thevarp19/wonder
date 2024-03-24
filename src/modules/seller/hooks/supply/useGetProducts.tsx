import { useQuery } from "@tanstack/react-query";
import { getSellerProducts } from "../../api/shared";
import { SellerProductsResponse } from "../../types/api";

export const useGetProducts = () => {
    return useQuery<SellerProductsResponse[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await getSellerProducts();
            return data;
        },
    });
};
