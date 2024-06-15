import { SellerSuppliesTable } from "@/modules/supply/components/SuppliesTable/SellerSuppliesTable";
import { useAppDispatch } from "@/redux/utils";
import { cn } from "@/utils/shared.util";
import { Button } from "antd";
import { FC } from "react";
import { reset } from "../redux/supply/actions";

interface SellerSupplyPageProps {}

export const SellerSupplyPage: FC<SellerSupplyPageProps> = ({}) => {
    const dispatch = useAppDispatch();
    return (
        <div className="min-h-full bg-white rounded-t-lg">
            <div className="p-4">
                <h1 className="pb-4 text-2xl font-semibold">Поставки</h1>
                <Button
                    className={cn("mb-4")}
                    onClick={() => {
                        dispatch(reset());
                    }}
                    href="/seller/supply/create"
                    type="primary"
                >
                    Создать новую поставку
                </Button>
                <SellerSuppliesTable />
            </div>
        </div>
    );
};
