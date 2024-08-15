import { SellerCalculator } from "@/modules/services/components/SellerCalculator";
import { FC } from "react";

interface SellerCalculatorPageProps {}

export const SellerCalculatorPage: FC<SellerCalculatorPageProps> = () => {
    return (
        <div>
            <SellerCalculator />
        </div>
    );
};
