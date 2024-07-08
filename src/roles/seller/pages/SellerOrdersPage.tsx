import { searchIcon } from "@/assets";
import { Title } from "@/components/shared/Title";
import { FilterMenu } from "@/components/ui/FilterMenu";
import { Image } from "@/components/ui/Image";
import { SellerOrdersTable } from "@/modules/order/components/OrdersTable/SellerOrdersTable";
import { items } from "@/modules/order/const";
import { DeliveryMode } from "@/modules/order/types";
import {
    Button,
    ConfigProvider,
    DatePicker,
    Input,
    Menu,
    MenuProps,
} from "antd";
import ruRU from "antd/lib/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { FC, useState } from "react";
interface SellerOrdersPageProps {}
const { RangePicker } = DatePicker;

const deliveryModes: { [key: string]: DeliveryMode } = {
    all: "",
    kaspi: "DELIVERY_REGIONAL_TODOOR",
    kaspiPostomat: "DELiVERY_POSTOMAT",
    express: "DELIVERY_LOCAL",
    pickup: "DELIVERY_PICKUP",
    kaspiDelivery: "DELIVERY_REGIONAL_PICKUP",
};

export const SellerOrdersPage: FC<SellerOrdersPageProps> = ({}) => {
    // const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [current, setCurrent] = useState("all");
    const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("");
    const [checkedItems, setCheckedItems] = useState({
        byOrderCode: true,
        byShopName: true,
        byStoreAddress: true,
        byProductName: true,
        byProductArticle: true,
        byProductVendorCode: true,
    });

    const [dateRange, setDateRange] = useState<
        [dayjs.Dayjs | null, dayjs.Dayjs | null]
    >([null, null]);

    const handleDateChange = (
        dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]
    ) => {
        setDateRange(dates);
    };
    const handleSearch = () => {
        if (dateRange[0] && dateRange[1]) {
            const formattedDates = dateRange.map((date) =>
                date?.format("YYYY-MM-DD")
            );
            console.log("Selected Dates:", formattedDates);
            // Use formattedDates as needed
            // Example: setSearchQuery({ ...searchValue, dates: formattedDates });
        }
        setSearchQuery("searchValue");
    };
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setDeliveryMode(deliveryModes[e.key]);
    };
    return (
        <div>
            <Title text="Заказы" />
            <div className="flex items-center justify-between mb-4">
                <div className="flex w-full max-w-sm gap-4">
                    <ConfigProvider locale={ruRU}>
                        <RangePicker
                            className="ml-2"
                            placeholder={["Дата от", "Дата до"]}
                            value={dateRange}
                            onChange={handleDateChange}
                            disabledDate={(currentDate) =>
                                currentDate &&
                                currentDate > dayjs().add(90, "day")
                            }
                        />
                    </ConfigProvider>
                    <Button
                        className="ml-2"
                        type="primary"
                        onClick={handleSearch}
                    >
                        Применить
                    </Button>
                </div>
            </div>
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
                    <div className="bg-[#F7F9FB] flex items-center px-2 rounded-lg gap-4">
                        <Input
                            prefix={
                                <Image
                                    src={searchIcon}
                                    alt="searchIcon"
                                    className={"w-5 h-5"}
                                />
                            }
                            placeholder="Поиск"
                            // value={""}
                            className="!min-w-[217px]"
                            onChange={() => {}}
                        />
                        <div className="flex w-[30px]">
                            <FilterMenu
                                checkedItems={checkedItems}
                                setCheckedItems={setCheckedItems}
                            />
                        </div>
                    </div>
                </div>
                <SellerOrdersTable
                    searchValue={searchQuery}
                    deliveryMode={deliveryMode}
                    byOrderCode={checkedItems.byOrderCode}
                    byShopName={checkedItems.byShopName}
                    byStoreAddress={checkedItems.byStoreAddress}
                    byProductName={checkedItems.byProductName}
                    byProductArticle={checkedItems.byProductArticle}
                    byProductVendorCode={checkedItems.byProductVendorCode}
                />
            </div>
        </div>
    );
};
