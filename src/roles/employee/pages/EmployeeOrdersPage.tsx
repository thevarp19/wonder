import { FilterButton } from "@/components/ui/FilterButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmployeeOrdersTable } from "@/modules/order/components/OrdersTable/EmployeeOrdersTable";
import { Menu, MenuProps } from "antd";
import { FC, useState } from "react";

interface EmployeeOrdersPageProps {}

const items: MenuProps["items"] = [
    {
        label: "Все",
        key: "all",
    },
    {
        label: "Каспи",
        key: "kaspi",
    },
    {
        label: "Экспресс",
        key: "express",
    },
    {
        label: "Самовывоз",
        key: "pickup",
    },
];

export const EmployeeOrdersPage: FC<EmployeeOrdersPageProps> = ({}) => {
    const [current, setCurrent] = useState("all");

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };
    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">Заказы</h1>
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
            <div>
                <Menu
                    items={items}
                    mode="horizontal"
                    onClick={onClick}
                    selectedKeys={[current]}
                />
                <EmployeeOrdersTable />
            </div>
        </div>
    );
};
