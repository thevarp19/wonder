import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getSellerProductsWithSizes, getServiceParams } from "./api";
import { GetSellerProductsSizes, GetServiceItemsResponse } from "./types";

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
// export const useGetProductsSizes = (
//     page: number = 1,
//     size: number = 10,
//     search: string = ""
// ) => {
//     return useQuery<GetSellerProductsSizes>({
//         queryKey: [`seller-products-sizes`, page, size],
//         queryFn: async () => {
//             const { data } = await getSellerProductsWithSizes(
//                 page,
//                 size,
//                 search
//             );
//             return data;
//         },
//     });
// };

export const useInfiniteGetProductsSizes = (
    pageSize = 10,
    searchValue = ""
) => {
    return useInfiniteQuery<GetSellerProductsSizes>({
        queryKey: ["seller-products-sizes", searchValue],
        queryFn: ({ pageParam = 1 }: any) =>
            getSellerProductsWithSizes({
                pageParam,
                pageSize,
                searchValue,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.last ? undefined : lastPage.page + 1;
        },
    });
};
