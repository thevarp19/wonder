import { scan, searchIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { EmployeeTransferTable } from "@/modules/order/components/EmployeeOrders/EmployeeTransferTable";
import { deliveryModes, items } from "@/modules/order/const";
import { DeliveryMode } from "@/modules/order/types";
import { cn, useDebounce } from "@/utils/shared.util";
import { Button, ConfigProvider, Input, Menu, MenuProps } from "antd";
import { FC, useState } from "react";

interface EmployeeOrderTransferPageProps {}

export const EmployeeOrderTransferPage: FC<
    EmployeeOrderTransferPageProps
> = () => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const [current, setCurrent] = useState("all");
    const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("ALL");

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setDeliveryMode(deliveryModes[e.key]);
    };
    return (
        <div className="flex flex-col h-full gap-5">
            <div>
                <h2 className="pb-5 text-xl font-semibold ">Передача</h2>
                <Button
                    type="primary"
                    size="large"
                    // onClick={toScanProductsSearch}
                    className="!flex !items-center !justify-center min-w-[200px] !gap-2 w-max"
                >
                    <Image
                        src={scan}
                        alt="scan"
                        className={cn("min-w-5 h-5")}
                    />
                    <h2 className="md:text-[12px] text-[16px] text-white">
                        CКАНИРОВАТЬ
                    </h2>
                </Button>
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
                    <EmployeeTransferTable
                        searchValue={debouncedSearchValue}
                        deliveryMode={deliveryMode}
                    />
                </div>
            </div>
        </div>
    );
};
