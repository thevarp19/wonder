import { useQuery } from "@tanstack/react-query";
import { getSellerProducts } from "../../api/shared";
import { SellerProductsResponse } from "../../types/api";

export const useGetStores = () => {
    return useQuery<SellerProductsResponse[]>({
        queryKey: ["stores"],
        queryFn: async () => {
            const { data } = await getSellerProducts();
            return data;
        },
    });
};
