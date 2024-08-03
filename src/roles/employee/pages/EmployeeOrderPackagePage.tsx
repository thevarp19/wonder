import { scan, searchIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { EmployeePackageTable } from "@/modules/order/components/EmployeeOrders/EmployeePackageTable";
import { deliveryModes, items } from "@/modules/order/const";
import { orderStatusMutation } from "@/modules/order/mutations";
import { useGetPackageOrderEmployee } from "@/modules/order/queries";
import {
    DeliveryMode,
    ProductStatusChangeRequest,
} from "@/modules/order/types";
import { useScannerMultipleResults } from "@/modules/scan/hooks";
import { toScanOrdersTransfer } from "@/modules/scan/utils";
import { cn, useDebounce } from "@/utils/shared.util";
import { Button, ConfigProvider, Input, Menu, MenuProps } from "antd";
import { FC, useEffect, useRef, useState } from "react";

interface EmployeeOrderPackagePageProps {}

export const EmployeeOrderPackagePage: FC<
    EmployeeOrderPackagePageProps
> = () => {
    let scannedProducts = useScannerMultipleResults();
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const hasCalledEffect = useRef(false);
    const [current, setCurrent] = useState("all");
    const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("ALL");
    const [page, setPage] = useState(1);
    const { data: orders, isPending } = useGetPackageOrderEmployee(
        page,
        10,
        debouncedSearchValue,
        deliveryMode
    );
    const { mutateAsync: transferMutate } = orderStatusMutation();
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setDeliveryMode(deliveryModes[e.key]);
    };
    // const newSearchParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (hasCalledEffect.current) return;

        const assembleProductsHandler = async () => {
            if (scannedProducts.length > 0 && orders) {
                const cleanedProductIds = scannedProducts.map((p) =>
                    p.replace(/^0+/, "")
                );
                console.log("cleanedProductIds", cleanedProductIds);

                const scannedProductIdsSet = new Set(cleanedProductIds);

                const filteredOrders = orders.content.filter((order) =>
                    scannedProductIdsSet.has(order.id.toString())
                );
                console.log("filteredOrders", filteredOrders);

                const requests: ProductStatusChangeRequest[] =
                    filteredOrders.map((order) => ({
                        id: order.id,
                        order_entry: order.order_entry,
                        status: "TRANSFER",
                    }));

                transferMutate(requests);
            }
        };

        if (!isPending) {
            assembleProductsHandler();
            hasCalledEffect.current = true;
        }

        // newSearchParams.delete("result");
        // newSearchParams.delete("type");
        // newSearchParams.delete("step");
        // const newUrl = `${
        //     window.location.pathname
        // }?${newSearchParams.toString()}`;
        // window.history.replaceState(null, "", newUrl);
    }, [scannedProducts, orders, isPending]);

    return (
        <div className="flex flex-col h-full gap-5">
            <div>
                <h2 className="pb-5 text-xl font-semibold ">Упаковка</h2>
                <Button
                    type="primary"
                    size="large"
                    onClick={toScanOrdersTransfer}
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
                    <EmployeePackageTable
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
