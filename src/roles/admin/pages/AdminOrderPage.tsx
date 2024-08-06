import { FilterButton } from "@/components/ui/FilterButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { AdminOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable/AdminOrderDetailsTable";
// import { AdminOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx/EmployeeOrderTable";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface AdminOrderPageProps {}

export const AdminOrderPage: FC<AdminOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();
    const orderId = parseInt(orderIdRaw || "");

    return (
        <div>
            <h1 className="pb-4 text-[18px] font-semibold">
                Заказ - <span className="underline">{orderId}</span>
            </h1>

            <div className="flex items-center justify-between mb-4">
                <div className="w-full max-w-sm">
                    <SearchInput
                        searchValue={""}
                        setSearchValue={() => {}}
                        onSearch={() => {}}
                    />
                </div>
                <div>
                    <FilterButton />
                </div>
            </div>
            <AdminOrderDetailsTable orderId={orderId} />
        </div>
    );
};
