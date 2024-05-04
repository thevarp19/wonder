import { SupplyEmployeeProductsTable } from "@/modules/supply/components/SupplyEmployeeProductsTable";
import { useGetSupply, useGetSupplyProducts } from "@/modules/supply/queries";
import { Button } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface SupplyDetailsPageProps {}

export const SupplyDetailsPage: FC<SupplyDetailsPageProps> = ({}) => {
    const { supplyId } = useParams();
    const { data, isPending } = useGetSupplyProducts(Number(supplyId));
    const {} = useGetSupply(Number(supplyId));
    return (
        <div>
            <div className="flex items-center justify-between my-4">
                <div className="flex flex-col gap-1 text-xl font-semibold">
                    <span>Id: {supplyId}</span>
                    <span>Store: {data?.storeAddress}</span>
                </div>
                <Button type="primary" size="large">
                    Start scanning
                </Button>
            </div>
            <SupplyEmployeeProductsTable data={data} isPending={isPending} />
        </div>
    );
};
