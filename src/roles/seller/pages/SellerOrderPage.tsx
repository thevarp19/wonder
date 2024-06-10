import { SearchInput } from "@/components/ui/SearchInput";
import { OrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx";
import { FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface SellerOrderPageProps {}

export const SellerOrderPage: FC<SellerOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();
    const orderId = parseInt(orderIdRaw || "");

    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold ">
                Заказ-<span className="underline">{orderId}</span>
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
                    <Button
                        type="primary"
                        size="large"
                        icon={<FilterOutlined />}
                    ></Button>
                </div>
            </div>
            <OrderDetailsTable orderId={orderId} />
        </div>
    );
};
