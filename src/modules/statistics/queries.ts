import { useQuery } from "@tanstack/react-query";
import { getAdminStatistics } from "./api";
import { AnalyticsData, DurationType } from "./types";

// export const useGetAdminSalesInfo = (duration: DurationType) => {
//     return useQuery<GetSalesAdminInfoResponse>({
//         queryKey: [`salesInfoAdmin`, duration],
//         queryFn: async () => {
//             const { data } = await getAdminSalesInfo(duration);
//             return data;
//         },
//     });
// };
// export const useGetSellerSalesInfo = (duration: DurationType) => {
//     return useQuery<GetSalesSellerInfoResponse>({
//         queryKey: [`salesInfoSeller`, duration],
//         queryFn: async () => {
//             const { data } = await getSellerSalesInfo(duration);
//             return data;
//         },
//     });
// };
// export const useGetAdminTopSeller = (page: number = 0, size: number = 10) => {
//     return useQuery<GetTopSellerResponse>({
//         queryKey: [`topSeller`, page, size],
//         queryFn: async () => {
//             const { data } = await getAdminTopSeller(page, size);
//             return data;
//         },
//     });
// };

// export const useGetSellerTopProducts = (
//     page: number = 0,
//     size: number = 10
// ) => {
//     return useQuery<GetTopProductResponse>({
//         queryKey: [`topProducts`, page, size],
//         queryFn: async () => {
//             const { data } = await getSellerTopProducts(page, size);
//             return data;
//         },
//     });
// };
// export const useGetAdminLastOrders = (page: number = 0, size: number = 10) => {
//     return useQuery<GetLastOrdersResponse>({
//         queryKey: [`lastOrders`, page, size],
//         queryFn: async () => {
//             const { data } = await getAdminLastOrders(page, size);
//             return data;
//         },
//     });
// };

export const useGetAdminStatistics = (duration: DurationType) => {
    return useQuery<AnalyticsData>({
        queryKey: [`statisticsAdmin`, duration],
        queryFn: async () => {
            const { data } = await getAdminStatistics(duration);
            return data;
        },
    });
};
// export const useGetSellerDailyInfo = (duration: DurationType) => {
//     return useQuery<GetDailyCountResponse[]>({
//         queryKey: [`dailyInfoSeller`, duration],
//         queryFn: async () => {
//             const { data } = await getSellerDailyInfo(duration);
//             return data;
//         },
//     });
// };
