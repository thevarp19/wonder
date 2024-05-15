import { getUserData } from "@/lib/jwt/decode";
import { useQuery } from "@tanstack/react-query";
import { getSellerProfile } from "./api";
import { GetSellerProfile } from "./types";

export const useGetSellerProfile = () => {
    return useQuery<GetSellerProfile>({
        queryKey: ["seller-profile"],
        queryFn: async () => {
            const id = getUserData()?.userId;
            if (!id) {
                throw new Error("User id not found");
            }
            const { data } = await getSellerProfile(id);
            return data;
        },
    });
};
