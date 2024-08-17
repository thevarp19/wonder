import { searchIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { BalanceAdminTable } from "@/modules/balance/components/BalanceAdminTable";
import { BalanceRequestTable } from "@/modules/balance/components/BalanceRequestTable";
import { useGetAdminReplenishment } from "@/modules/balance/queries";
import { useDebounce } from "@/utils/shared.util";
import { ConfigProvider, Input, Menu, MenuProps } from "antd";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface AdminBalancePageProps {}

const items: MenuProps["items"] = [
    {
        label: "Запросы",
        key: "requests",
    },
    {
        label: "Баланс",
        key: "balances",
    },
];

export const AdminBalancePage: FC<AdminBalancePageProps> = () => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const [searchParams, setSearchParams] = useSearchParams();
    const [current, setCurrent] = useState(
        searchParams.get("menu_x") || "requests"
    );
    const [page, setPage] = useState(0);
    const { data, isPending } = useGetAdminReplenishment(
        page,
        10,
        debouncedSearchValue
    );
    const onClick: MenuProps["onClick"] = (e) => {
        setSearchValue("");
        setCurrent(e.key);
        setSearchParams({ menu_x: e.key });
    };
    return (
        <div className="h-full">
            <div className="px-2 py-5">
                {current === "requests" && (
                    <h2 className="text-2xl font-semibold ">
                        Запросы на пополнения
                    </h2>
                )}
                {current === "balances" && (
                    <h2 className="text-2xl font-semibold ">
                        Балансы продавцов
                    </h2>
                )}
            </div>
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
                    {current === "requests" && (
                        <BalanceRequestTable
                            data={data}
                            isPending={isPending}
                            setPage={setPage}
                            page={page}
                        />
                    )}
                    {current === "balances" && (
                        <BalanceAdminTable
                            data={data}
                            isPending={isPending}
                            setPage={setPage}
                            page={page}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
