import { DesktopOutlined, ShopOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { FC, useState } from "react";
import { SellerStoresTable } from "../components/store/SellerStoresTable";

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

interface SellerSettingsPageProps {}

export const SellerSettingsPage: FC<SellerSettingsPageProps> = ({}) => {
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
                    <SellerStoresTable />
                </div>
            )}
        </div>
    );
};
