import { searchIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { AdminOrdersTable } from "@/modules/order/components/AdminOrders/AdminOrdersTable";
import { deliveryModes, items } from "@/modules/order/const";
import { DeliveryMode } from "@/modules/order/types";
import { useDebounce } from "@/utils/shared.util";
import { ConfigProvider, Input, Menu, MenuProps } from "antd";
import { FC, useState } from "react";

interface AdminOrdersPageProps {}

// const { RangePicker } = DatePicker;

export const AdminOrdersPage: FC<AdminOrdersPageProps> = ({}) => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const [current, setCurrent] = useState("all");
    const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("ALL");

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setDeliveryMode(deliveryModes[e.key]);
    };

    return (
        <div className="h-full">
            <div className="flex flex-col gap-5">
                <div className="overflow-x-auto bg-[#F7F9FB] md:pt-0 pt-2 rounded-lg ">
                    <div className="min-w-[600px] flex justify-between">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Menu: {
                                        itemBg: "#F7F9FB",
                                        colorSplit: "#F7F9FB",
                                    },
                                },
                            }}
                        >
                            <Menu
                                items={items}
                                mode="horizontal"
                                className="w-full !font-bold"
                                onClick={onClick}
                                selectedKeys={[current]}
                            />
                        </ConfigProvider>
                        <div className="flex items-center gap-4 px-2 rounded-lg">
                            <Input
                                prefix={
                                    <Image
                                        src={searchIcon}
                                        alt="searchIcon"
                                        className={"w-5 h-5"}
                                    />
                                }
                                placeholder="Поиск"
                                value={searchValue}
                                className="!min-w-[260px]"
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                    <AdminOrdersTable
                        searchValue={debouncedSearchValue}
                        deliveryMode={deliveryMode}
                    />
                </div>
            </div>
        </div>
    );
};
