import { SupplyEmployeeProductsTable } from "@/modules/supply/components/SupplyEmployeeProductsTable";
import { useGetSupplyProducts } from "@/modules/supply/queries";
import { useAppDispatch } from "@/redux/utils";
import { Button } from "antd";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { resetState, setSupplyId } from "../redux/scan/actions";

interface SupplyDetailsPageProps {}

export const SupplyDetailsPage: FC<SupplyDetailsPageProps> = ({}) => {
    const { supplyId } = useParams();
    const { data, isPending } = useGetSupplyProducts(Number(supplyId));

    const dispatch = useAppDispatch();

    const dataSource = data ? data : [];

    return (
        <div>
            <div className="flex items-center justify-between my-4">
                <div className="flex flex-col gap-1 text-xl font-semibold">
                    <span>Идентификатор: {supplyId}</span>
                    <span>Склад: {}</span>
                </div>
                <Link to={`/employee/scan`}>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                            dispatch(resetState());
                            dispatch(setSupplyId(Number(supplyId)));
                        }}
                    >
                        Начать сканирование
                    </Button>
                </Link>
            </div>
            <SupplyEmployeeProductsTable
                data={dataSource}
                isPending={isPending}
            />
        </div>
    );
};
