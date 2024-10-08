import { searchIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { BoxesTable } from "@/modules/box/components/BoxesTable";
import { StoresTable } from "@/modules/store/components/StoresTable";
import { cn, useDebounce } from "@/utils/shared.util";
import { DropboxOutlined, ShopOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Menu, MenuProps } from "antd";
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
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);

    const onClick: MenuProps["onClick"] = (e) => {
        setSearchValue("");
        setCurrent(e.key);
        setSearchParams({ menu_x: e.key });
    };
    return (
        <div className="h-full">
            <div className="flex items-center justify-between mb-4">
                {current === "stores" && (
                    <div className="flex flex-col w-full gap-4 md:max-w-sm">
                        <h1 className="text-[18px] font-semibold">Склады</h1>
                        <Button
                            size="large"
                            type="primary"
                            className="w-full md:w-max !rounded-md"
                            href="/admin/settings/create-store"
                        >
                            Создать новый склад
                        </Button>
                    </div>
                )}
                {current === "boxes" && (
                    <div className="flex flex-col w-full gap-4 md:max-w-sm">
                        <h1 className="text-[18px] font-semibold">Коробки</h1>
                        <Button
                            size="large"
                            type="primary"
                            className="w-full md:w-max !rounded-md"
                            href="/admin/settings/create-box"
                        >
                            Создать новую коробку
                        </Button>
                    </div>
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
                            ></Menu>
                        </ConfigProvider>
                        <div className="flex items-center px-2 rounded-lg">
                            <Input
                                prefix={
                                    <Image
                                        src={searchIcon}
                                        alt="searchIcon"
                                        className={cn("w-5 h-5 ")}
                                    />
                                }
                                placeholder="Поиск"
                                value={searchValue}
                                className="!min-w-[217px]"
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {current === "stores" && <StoresTable />}
                {current === "boxes" && (
                    <BoxesTable searchValue={debouncedSearchValue} />
                )}
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
