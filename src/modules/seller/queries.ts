import { useQuery } from "@tanstack/react-query";
import { getSellerProfile } from "./api";
import { GetSellerProfile } from "./types";

export const useGetSellerProfile = () => {
    return useQuery<GetSellerProfile>({
        queryKey: ["seller-profile"],
        queryFn: async () => {
            const { data } = await getSellerProfile();
            return data;
        },
    });
};
