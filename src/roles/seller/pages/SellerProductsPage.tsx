import { updateImport } from "@/modules/product/api";
import { ProductPriceTable } from "@/modules/product/components/ProductPriceTable";
import { ProductsTable } from "@/modules/product/components/ProductsTable";
import { useGetEnabledProductCount } from "@/modules/product/queries";
import { useDebounce } from "@/utils/shared.util";
import { SearchOutlined } from "@ant-design/icons";
import {
    App,
    Button,
    ConfigProvider,
    Input,
    Menu,
    MenuProps,
    Select,
    Spin,
} from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const { Option } = Select;

interface SellerProductsPageProps {}

const items: MenuProps["items"] = [
    {
        label: "Цены",
        key: "prices",
    },
    {
        label: "Товары",
        key: "products",
    },
];

export const SellerProductsPage: FC<SellerProductsPageProps> = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: productCount, isPending } = useGetEnabledProductCount();
    const [current, setCurrent] = useState(
        searchParams.get("current") || "prices"
    );
    const onClick: MenuProps["onClick"] = useCallback((e: any) => {
        setCurrent(e.key);
        setSearchParams({ current: e.key });
    }, []);
    const [isPublished, setIsPublished] = useState<boolean | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const { message } = App.useApp();

    const debouncedSearchValue = useDebounce(searchValue, 500);
    const handleChange = (value: string) => {
        setIsPublished(
            value === "published"
                ? true
                : value === "unpublished"
                ? false
                : null
        );
    };
    useEffect(() => {
        setIsPublished(null);
    }, [productCount]);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await updateImport();
            message.success("Товары обновляются!");
        } catch (error) {
            message.error("Ошибка обновление!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full bg-white rounded-t-lg">
            <div className="flex flex-col gap-5">
                <div className="overflow-x-auto bg-[#F7F9FB] md:p-2 p-0 pt-2 rounded-lg">
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
                            <div className="flex items-center w-full gap-6">
                                <Menu
                                    items={items}
                                    mode="horizontal"
                                    className="w-full !font-bold"
                                    onClick={onClick}
                                    selectedKeys={[current]}
                                    style={{ fontWeight: 600 }}
                                />

                                <div className="flex gap-5">
                                    <Button
                                        type="primary"
                                        className=""
                                        // icon={<ReloadOutlined spin={loading} />}
                                        loading={loading}
                                        onClick={handleUpdate}
                                    >
                                        Синхронизировать
                                    </Button>
                                    {current === "products" && (
                                        <div className="flex gap-5">
                                            <Button type="primary">
                                                Экспорт
                                            </Button>
                                            <Button type="primary">
                                                Импорт
                                            </Button>
                                        </div>
                                    )}

                                    <Select
                                        className="!min-w-[200px]"
                                        placeholder="Статус"
                                        onChange={handleChange}
                                        value={
                                            isPublished === true
                                                ? "published"
                                                : isPublished === false
                                                ? "unpublished"
                                                : ""
                                        }
                                    >
                                        <Option value="">Не выбрано</Option>
                                        <Option value="published">
                                            {`Опубликовано (${
                                                isPending ? (
                                                    <Spin size="small" />
                                                ) : (
                                                    productCount?.enabled_count
                                                )
                                            })`}
                                        </Option>
                                        <Option value="unpublished">
                                            {`Не опубликовано (${
                                                isPending ? (
                                                    <Spin size="small" />
                                                ) : (
                                                    productCount?.not_enabled_count
                                                )
                                            })`}
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 px-2 rounded-lg">
                                <Input
                                    prefix={<SearchOutlined />}
                                    placeholder="Поиск"
                                    value={searchValue}
                                    className="!min-w-[230px] lg:!min-w-[317px]"
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                    }}
                                />
                            </div>
                        </ConfigProvider>
                    </div>
                </div>

                {current === "prices" && (
                    <ProductPriceTable
                        isPublished={isPublished}
                        debouncedSearchValue={debouncedSearchValue}
                    />
                )}
                {current === "products" && (
                    <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                        <ProductsTable
                            isPublished={isPublished}
                            searchValue={debouncedSearchValue}
                        />
                    </div>
                )}
                {/* {current === "upload" && (
                    <div className="h-full bg-white rounded-t-lg">
                        <ProductsUploadFromFile />
                    </div>
                )} */}
            </div>
        </div>
    );
};
