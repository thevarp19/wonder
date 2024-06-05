import { useQuery } from "@tanstack/react-query";
import { getSalesInfo } from "./api";
import { DurationType, GetSalesInfoResponse } from "./types";

export const useGetAdminSalesInfo = (duration: DurationType) => {
    return useQuery<GetSalesInfoResponse>({
        queryKey: [`salesInfoAdmin`, duration],
        queryFn: async () => {
            const { data } = await getSalesInfo(duration);
            return data;
        },
    });
};
