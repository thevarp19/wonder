import { searchIcon } from "@/assets";
import { BoxesTable } from "@/modules/box/components/BoxesTable";
import { StoresTable } from "@/modules/store/components/StoresTable";
import { cn } from "@/utils/shared.util";
import { DropboxOutlined, ShopOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Image, Input, Menu, MenuProps } from "antd";
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
        icon: <DropboxOutlined />,
    },
    // {
    //     label: "XML",
    //     key: "xml",
    //     icon: <FileMarkdownOutlined />,
    // },
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
        <div className="h-full bg-white rounded-t-lg p-7">
            {current === "stores" && (
                <div className="flex flex-col gap-5 w-max">
                    <h1 className="px-2 py-1 text-xl font-semibold">Склады</h1>
                    <Button
                        size="large"
                        type="primary"
                        className="mb-4"
                        href="/admin/settings/create-store"
                    >
                        Создать новый склад
                    </Button>
                </div>
            )}
            {current === "boxes" && (
                <div className="flex flex-col gap-5 w-max">
                    <h1 className="px-2 py-1 text-xl font-semibold">Коробки</h1>
                    <Button
                        size="large"
                        type="primary"
                        className="mb-4"
                        href="/admin/settings/create-box"
                    >
                        Создать новую коробку
                    </Button>
                </div>
            )}
            <div className="flex flex-col gap-5">
                <div className="flex justify-between bg-[#F7F9FB] p-1 rounded-lg">
                    <div className="w-full bg-[#F7F9FB]">
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
                            ></Menu>
                        </ConfigProvider>
                    </div>
                    <div className="bg-[#F7F9FB] flex items-center px-2 rounded-lg">
                        <Input
                            prefix={
                                <Image
                                    src={searchIcon}
                                    alt="searchIcon"
                                    className={cn("w-5 h-5 ")}
                                />
                            }
                            placeholder="Поиск"
                            // value={""}
                            className="!min-w-[217px]"
                            onChange={() => {}}
                        />
                    </div>
                </div>

                {current === "stores" && <StoresTable />}
                {current === "boxes" && <BoxesTable />}
            </div>
            {/* {current === "xml" && (
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
            )} */}
        </div>
    );
};
