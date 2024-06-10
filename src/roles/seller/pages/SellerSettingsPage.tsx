import { SellerStoresTable } from "@/modules/store/components/StoresTable/SellerStoresTable";
import { ShopOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { FC, useState } from "react";

const items: MenuProps["items"] = [
    {
        label: "Магазины",
        key: "stores",
        icon: <ShopOutlined />,
    },
    // {
    //     label: "Другая страница",
    //     key: "other",
    //     icon: <DesktopOutlined />,
    // },
];

interface SellerSettingsPageProps {}

export const SellerSettingsPage: FC<SellerSettingsPageProps> = ({}) => {
    const [current, setCurrent] = useState("stores");

    const onClick: MenuProps["onClick"] = (e) => {
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
                    <h1 className="pb-4 text-2xl font-semibold">Магазины</h1>
                    <SellerStoresTable />
                </div>
            )}
        </div>
    );
};
