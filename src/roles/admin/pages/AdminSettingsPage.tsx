import { BoxesTable } from "@/modules/box/components/BoxesTable";
import { StoresTable } from "@/modules/store/components/StoresTable";
import { BoxPlotOutlined, ShopOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

const items: MenuProps["items"] = [
    {
        label: "Магазины",
        key: "stores",
        icon: <ShopOutlined />,
    },
    {
        label: "Ящики",
        key: "boxes",
        icon: <BoxPlotOutlined />,
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
                    ["stores", "boxes"].includes(current) ? current : "stores",
                ]}
            />
            {current === "stores" && (
                <div className="p-4">
                    <h1 className="pb-4 text-2xl font-semibold">Магазины</h1>
                    <Button
                        size="large"
                        type="primary"
                        className="mb-4"
                        href="/admin/settings/create-store"
                    >
                        Создать новый магазин
                    </Button>
                    <StoresTable />
                </div>
            )}
            {current === "boxes" && (
                <div className="p-4">
                    <h1 className="pb-4 text-2xl font-semibold">Ящики</h1>
                    <Button
                        size="large"
                        type="primary"
                        className="mb-4"
                        href="/admin/settings/create-box"
                    >
                        Создать новый ящик
                    </Button>
                    <BoxesTable />
                </div>
            )}
        </div>
    );
};
