import { SupplyDetailsTable } from "@/modules/supply/components/SupplyDetailsTable";
import { padNumbers } from "@/utils/shared.util";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface SellerSupplyDetailsPageProps {}

export const SellerSupplyDetailsPage: FC<
    SellerSupplyDetailsPageProps
> = ({}) => {
    const { supplyId } = useParams();
    const id = parseInt(supplyId || "");
    return (
        <div className="min-h-full bg-white rounded-t-lg">
            <div className="p-4">
                <h1 className="pb-4 text-2xl font-semibold">
                    Поставка-
                    <span className="underline">{padNumbers(id, 8)}</span>
                </h1>
                <SupplyDetailsTable supplyId={id} />
            </div>
        </div>
    );
};
