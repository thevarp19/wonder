import { Title } from "@/components/shared/Title";
import { LinkCopyInput } from "@/components/ui/LinkCopyInput";
import { useGetSellerProfile } from "@/modules/seller/queries";
import { SellerStoresTable } from "@/modules/store/components/StoresTable/SellerStoresTable";
import { FileMarkdownOutlined, ShopOutlined } from "@ant-design/icons";
import { ConfigProvider, Menu, MenuProps } from "antd";
import { FC, useState } from "react";

const items: MenuProps["items"] = [
    {
        label: "Склады",
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
        <div className="h-full rounded-t-lg ">
            {current === "xml" && <Title text="XML ссылка" />}
            {current === "stores" && <Title text="Склады" />}
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemBg: "#F7F9FB",
                            colorSplit: "#F7F9FB",
                            borderRadius: 8,
                        },
                    },
                }}
            >
                <Menu
                    items={items}
                    mode="horizontal"
                    onClick={onClick}
                    className="rounded-t-lg"
                    selectedKeys={[
                        ["stores", "xml"].includes(current)
                            ? current
                            : "stores",
                    ]}
                />
            </ConfigProvider>

            {current === "stores" && (
                <div className="p-4">
                    <SellerStoresTable />
                </div>
            )}
            {current === "xml" && (
                <div className="p-4 bg-[#F7F9FB] rounded-b-lg">
                    {/* <h1 className="text-2xl font-semibold ">XML ссылка</h1> */}
                    <h2 className="font-semibold">Скопируйте ссылку</h2>
                    <h2 className="font-semibold">
                        Добавьте на каспи сайт для привязки данных
                    </h2>
                    <div className="max-w-lg py-4">
                        <LinkCopyInput link={sellerInfo?.pathToXml ?? ""} />
                    </div>
                </div>
            )}
        </div>
    );
};
