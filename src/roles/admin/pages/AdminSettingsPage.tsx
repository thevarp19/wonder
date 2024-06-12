import { FilterButton } from "@/components/ui/FilterButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { StoresTable } from "@/modules/store/components/StoresTable";
import { XMLTable } from "@/modules/xml/components/XMLTable";
import {
    BoxPlotOutlined,
    FileMarkdownOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

const items: MenuProps["items"] = [
    {
        label: "Склады",
        key: "stores",
        icon: <ShopOutlined />,
    },
    {
        label: "Коробки",
        key: "boxes",
        icon: <BoxPlotOutlined />,
    },
    {
        label: "XML",
        key: "xml",
        icon: <FileMarkdownOutlined />,
    },
];

interface AdminSettingsPageProps {}

export const AdminSettingsPage: FC<AdminSettingsPageProps> = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [current, setCurrent] = useState(
        searchParams.get("menu_x") || "stores"
    );

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setSearchParams({ menu_x: e.key });
    };
    return (
        <div className="h-full bg-white rounded-t-lg">
            <Menu
                items={items}
                mode="horizontal"
                onClick={onClick}
                selectedKeys={[
                    ["stores", "boxes", "xml"].includes(current)
                        ? current
                        : "stores",
                ]}
            />
            {current === "stores" && (
                <div className="p-4">
                    <h1 className="pb-4 text-2xl font-semibold">Склады</h1>
                    <Button
                        size="large"
                        type="primary"
                        className="mb-4"
                        href="/admin/settings/create-store"
                    >
                        Создать новый склад
                    </Button>
                    <StoresTable />
                </div>
            )}
            {current === "boxes" && (
                <div className="p-4">
                    <h1 className="pb-4 text-2xl font-semibold">Коробки</h1>
                    <Button
                        size="large"
                        type="primary"
                        className="mb-4"
                        href="/admin/settings/create-box"
                    >
                        Создать новый коробку
                    </Button>
                    {/* <BoxesTable /> */}
                </div>
            )}
            {current === "xml" && (
                <div className="p-4">
                    <h1 className="pb-4 text-2xl font-semibold">XML Таблица</h1>
                    <div className="flex items-center mb-4">
                        <div className="flex items-center w-full max-w-sm gap-5">
                            <SearchInput
                                searchValue={""}
                                setSearchValue={() => {}}
                                onSearch={() => {}}
                            />
                            <FilterButton />
                        </div>
                    </div>
                    <XMLTable />
                </div>
            )}
        </div>
    );
};
