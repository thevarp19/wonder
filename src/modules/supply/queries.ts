import { useQuery } from "@tanstack/react-query";
import {
    getSellerSupplies,
    getSuppliesByDate,
    getSupplyBox,
    getSupplyById,
    getSupplyProducts,
} from "./api";
import {
    GetSellerSupply,
    GetSuppliesByDate,
    GetSupplyById,
    GetSupplyProducts,
} from "./types";

export const useGetSuppliesByDate = (startDate: string, endDate: string) => {
    return useQuery<GetSuppliesByDate[]>({
        queryKey: ["supplies", startDate, endDate],
        queryFn: async () => {
            const { data } = await getSuppliesByDate(startDate, endDate);
            return data;
        },
    });
};

export const useGetSupply = (id: number) => {
    return useQuery<GetSupplyById[]>({
        queryKey: [`supplies-${id}`],
        queryFn: async () => {
            const { data } = await getSupplyById(id);
            return data;
        },
    });
};

// export const useGetSupplyReport = (id: number) => {
//     return useQuery<GetSupplyReport>({
//         queryKey: [`suppliesReport-${id}`],
//         queryFn: async () => {
//             const { data } = await getSupplyReport(id);
//             return data;
//         },
//     });
// };

export const useGetSupplyProducts = (id: number) => {
    return useQuery<GetSupplyProducts>({
        queryKey: [`supply-products`, id],
        queryFn: async () => {
            const { data } = await getSupplyProducts(id);
            return data;
        },
    });
};

export const useGetSupplyBox = (boxBarCode: number) => {
    return useQuery<GetSupplyProducts>({
        queryKey: [`supply-box`, boxBarCode],
        retry: 1,
        queryFn: async () => {
            const { data } = await getSupplyBox(boxBarCode);
            return data;
        },
    });
};

export const useGetSellerSupplies = () => {
    return useQuery<GetSellerSupply[]>({
        queryKey: [`seller-supplies`],
        queryFn: async () => {
            const { data } = await getSellerSupplies();
            return data;
        },
    });
};
