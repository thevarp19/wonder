import { formatPrice } from "@/utils/shared.util";
import { FC } from "react";

interface PriceCellProps {
    price: number;
}

export const PriceCell: FC<PriceCellProps> = ({ price }) => {
    return <div>{formatPrice(price)} KZT</div>;
};
