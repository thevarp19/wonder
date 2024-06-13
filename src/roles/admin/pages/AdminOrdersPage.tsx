import { FilterMenu } from "@/components/ui/FilterMenu";
import { SearchInput } from "@/components/ui/SearchInput";
import { AdminOrdersTable } from "@/modules/order/components/OrdersTable/AdminOrdersTable";
import { DeliveryMode } from "@/modules/order/types";
import { Menu, MenuProps } from "antd";
import { FC, useState } from "react";

interface AdminOrdersPageProps {}
const items: MenuProps["items"] = [
    {
        label: "Все",
        key: "all",
    },
    {
        label: "Каспи Доставка",
        key: "kaspi",
    },
    {
        label: "Каспи Postomat",
        key: "kaspiPostomat",
    },
    {
        label: "Экспресс",
        key: "express",
    },
    {
        label: "Самовывоз",
        key: "pickup",
    },
    {
        label: "Kaspi Доставка в Postomat",
        key: "kaspiDelivery",
    },
];
const deliveryModes: { [key: string]: DeliveryMode } = {
    all: "",
    kaspi: "DELIVERY_REGIONAL_TODOOR",
    kaspiPostomat: "DELiVERY_POSTOMAT",
    express: "DELIVERY_LOCAL",
    pickup: "DELIVERY_PICKUP",
    kaspiDelivery: "DELIVERY_REGIONAL_PICKUP",
};

export const AdminOrdersPage: FC<AdminOrdersPageProps> = ({}) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [current, setCurrent] = useState("all");
    const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("");
    const [checkedItems, setCheckedItems] = useState({
        byOrderCode: false,
        byShopName: false,
        byStoreAddress: false,
        byProductName: false,
        byProductArticle: false,
        byProductVendorCode: false,
    });

    const handleSearch = () => {
        setSearchQuery(searchValue);
    };
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setDeliveryMode(deliveryModes[e.key]);
    };
    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">Заказы</h1>
            <div className="flex items-center justify-between mb-4">
                <div className="w-full max-w-sm">
                    <SearchInput
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onSearch={handleSearch}
                    />
                </div>
                <div>
                    <FilterMenu
                        checkedItems={checkedItems}
                        setCheckedItems={setCheckedItems}
                    />
                </div>
            </div>
            <div>
                <Menu
                    items={items}
                    mode="horizontal"
                    onClick={onClick}
                    selectedKeys={[current]}
                />
                <AdminOrdersTable
                    searchValue={searchQuery}
                    deliveryMode={deliveryMode}
                    byOrderCode={checkedItems.byOrderCode}
                    byShopName={checkedItems.byShopName}
                    byStoreAddress={checkedItems.byStoreAddress}
                    byProductName={checkedItems.byProductName}
                    byProductArticle={checkedItems.byProductArticle}
                    byProductVendorCode={checkedItems.byProductVendorCode}
                />
            </div>
        </div>
    );
};
