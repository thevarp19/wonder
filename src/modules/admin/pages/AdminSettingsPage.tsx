import { DesktopOutlined, ShopOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { FC, useState } from "react";
import { AdminStoresTable } from "../components/store/AdminStoresTable";

const items: MenuProps["items"] = [
    {
        label: "Stores",
        key: "stores",
        icon: <ShopOutlined />,
    },
    {
        label: "Other page",
        key: "other",
        icon: <DesktopOutlined />,
    },
];

interface AdminSettingsPageProps {}

export const AdminSettingsPage: FC<AdminSettingsPageProps> = ({}) => {
    const [current, setCurrent] = useState("stores");

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };
    return (
        <div className="h-full bg-white rounded-t-lg">
            <Menu
                items={items}
                mode="horizontal"
                onClick={onClick}
                selectedKeys={[current]}
            />
            {current === "stores" && (
                <div className="p-4">
                    <h1 className="pb-4 text-2xl font-semibold">Stores</h1>
                    <Button
                        size="large"
                        type="primary"
                        className="mb-4"
                        href="/admin/settings/create-store"
                    >
                        Create a new store
                    </Button>
                    <AdminStoresTable />
                </div>
            )}
        </div>
    );
};
