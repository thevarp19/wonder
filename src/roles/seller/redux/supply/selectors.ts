import { useAppSelector } from "@/redux/utils";

export const useSupplyProducts = () => {
    return useAppSelector((state) => state.seller.supply.products);
};

export const useSupplyPacks = () => {
    return useAppSelector((state) => state.seller.supply.packs);
};

export const useSupply = () => {
    return useAppSelector((state) => state.seller.supply);
};
