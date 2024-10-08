import { scan, searchIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { EmployeeAssembleTable } from "@/modules/order/components/EmployeeOrders/EmployeeAssembleTable";
import { deliveryModes, items } from "@/modules/order/const";
import { useGetAssembleOrderEmployee } from "@/modules/order/queries";
import { DeliveryMode } from "@/modules/order/types";
import { cn, useDebounce } from "@/utils/shared.util";
import { Button, ConfigProvider, Input, Menu, MenuProps } from "antd";
import { FC, useEffect, useState } from "react";

interface EmployeeOrderAssemblePageProps {}

export const EmployeeOrderAssemblePage: FC<
    EmployeeOrderAssemblePageProps
> = () => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const [current, setCurrent] = useState("all");
    const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("ALL");
    const [page, setPage] = useState(0);
    const { data: orders, isPending } = useGetAssembleOrderEmployee(
        page,
        10,
        debouncedSearchValue,
        deliveryMode
    );
    useEffect(() => {
        setPage(0);
    }, [deliveryMode, searchValue]);
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setDeliveryMode(deliveryModes[e.key]);
    };

    return (
        <div className="flex flex-col h-full gap-5">
            <div>
                <h2 className="pb-5 text-xl font-semibold ">Сборка</h2>
                <Button
                    type="primary"
                    size="large"
                    href="/employee/orders/assemble/product"
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
                    <EmployeeAssembleTable
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
