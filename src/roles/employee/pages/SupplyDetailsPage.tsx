import { SupplyDetailsTable } from "@/modules/supply/components/SupplyDetailsTable";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface SupplyDetailsPageProps {}

export const SupplyDetailsPage: FC<SupplyDetailsPageProps> = ({}) => {
    const { supplyId } = useParams();
    return (
        <div>
            <h1>Id: {supplyId}</h1>
            <SupplyDetailsTable supplyId={Number(supplyId)} />
        </div>
    );
};
