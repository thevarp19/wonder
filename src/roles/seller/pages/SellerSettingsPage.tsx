import { LinkCopyInput } from "@/components/ui/LinkCopyInput";
import { useGetSellerProfile } from "@/modules/seller/queries";
import { SellerStoresTable } from "@/modules/store/components/StoresTable/SellerStoresTable";
import { FileMarkdownOutlined, ShopOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { FC, useState } from "react";

const items: MenuProps["items"] = [
    {
        label: "Магазины",
        key: "stores",
        icon: <ShopOutlined />,
    },
    {
        label: "XML",
        key: "xml",
        icon: <FileMarkdownOutlined />,
    },
];

interface SellerSettingsPageProps {}

export const SellerSettingsPage: FC<SellerSettingsPageProps> = ({}) => {
    const [current, setCurrent] = useState("stores");
    const { data: sellerInfo } = useGetSellerProfile();
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };
    return (
        <div className="h-full bg-white rounded-t-lg">
            <Menu
                items={items}
                mode="horizontal"
                onClick={onClick}
                selectedKeys={[
                    ["stores", "xml"].includes(current) ? current : "stores",
                ]}
            />
            {current === "stores" && (
                <div className="p-4">
                    <h1 className="pb-4 text-2xl font-semibold">Склады</h1>
                    <SellerStoresTable />
                </div>
            )}
            {current === "xml" && (
                <div className="p-4">
                    <h1 className="p-4 text-2xl font-semibold">XML ссылка</h1>
                    <h2 className="px-4 text-xl">Скопируйте ссылку</h2>
                    <h2 className="px-4 text-xl">
                        Добавьте на каспи сайт для привязки данных
                    </h2>
                    <div className="max-w-lg p-4">
                        <LinkCopyInput link={sellerInfo?.pathToXml ?? ""} />
                    </div>
                </div>
            )}
        </div>
    );
};
