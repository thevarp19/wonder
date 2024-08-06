import { searchIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { SellerTransferTable } from "@/modules/order/components/SellerOrders/SellerTransferTable";
import { deliveryModes, items } from "@/modules/order/const";
import { useGetTransferOrderSeller } from "@/modules/order/queries";
import { DeliveryMode } from "@/modules/order/types";
import { cn, useDebounce } from "@/utils/shared.util";
import { ConfigProvider, Input, Menu, MenuProps } from "antd";
import { FC, useState } from "react";

interface SellerOrderTransferPageProps {}

export const SellerOrderTransferPage: FC<SellerOrderTransferPageProps> = () => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const [current, setCurrent] = useState("all");
    const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("ALL");
    const [page, setPage] = useState(1);
    const { data: orders, isPending } = useGetTransferOrderSeller(
        page,
        10,
        debouncedSearchValue,
        deliveryMode
    );
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setDeliveryMode(deliveryModes[e.key]);
    };
    return (
        <div className="flex flex-col h-full gap-5">
            <div>
                <h2 className="pb-5 text-xl font-semibold ">Передача</h2>
            </div>
            <div className="flex flex-col gap-5">
                <div className="overflow-x-auto bg-[#F7F9FB] md:pt-0 pt-2 rounded-lg">
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
                                        className={cn("w-5 h-5")}
                                    />
                                }
                                placeholder="Поиск"
                                value={searchValue}
                                className="!min-w-[217px]"
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                    <SellerTransferTable
                        data={orders}
                        isPending={isPending}
                        setPage={setPage}
                        page={page}
                    />
                </div>
            </div>
        </div>
    );
};
