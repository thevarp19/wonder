import { searchIcon } from "@/assets";
import { Title } from "@/components/shared/Title";
import { FilterMenu } from "@/components/ui/FilterMenu";
import { Image } from "@/components/ui/Image";
import { EmployeeOrdersTable } from "@/modules/order/components/OrdersTable/EmployeeOrdersTable";
import { items } from "@/modules/order/const";
import { DeliveryMode } from "@/modules/order/types";
import { cn } from "@/utils/shared.util";
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

interface EmployeeOrdersPageProps {}
const { RangePicker } = DatePicker;

const deliveryModes: { [key: string]: DeliveryMode } = {
    all: "",
    kaspi: "DELIVERY_REGIONAL_TODOOR",
    kaspiPostomat: "DELiVERY_POSTOMAT",
    express: "DELIVERY_LOCAL",
    pickup: "DELIVERY_PICKUP",
    kaspiDelivery: "DELIVERY_REGIONAL_PICKUP",
};

export const EmployeeOrdersPage: FC<EmployeeOrdersPageProps> = ({}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchValue, setSearchValue] = useState("");

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
        setSearchQuery(searchValue);
    };
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setDeliveryMode(deliveryModes[e.key]);
    };
    return (
        <div className="h-full">
            <Title text="Заказы" />
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col items-center w-full gap-4 md:flex-row md:max-w-sm">
                    <ConfigProvider locale={ruRU}>
                        <RangePicker
                            className="w-full md:w-auto md:h-[32px] h-[40px]"
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
                        className="md:w-[130px] w-full md:!h-[32px] !h-[42px] md:!text-[13px] !text-[16px]"
                        type="primary"
                        onClick={handleSearch}
                    >
                        Применить
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="overflow-x-auto bg-[#F7F9FB] md:pt-0 pt-2 rounded-lg">
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
                            />
                        </ConfigProvider>
                        <div className="flex items-center gap-4 px-2 rounded-lg">
                            <Input
                                prefix={
                                    <Image
                                        src={searchIcon}
                                        alt="searchIcon"
                                        className={cn("w-5 h-5")}
                                    />
                                }
                                placeholder="Поиск"
                                value={searchValue}
                                className="!min-w-[217px]"
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                            <div className="flex w-[30px]">
                                <FilterMenu
                                    checkedItems={checkedItems}
                                    setCheckedItems={setCheckedItems}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                    <EmployeeOrdersTable
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
        </div>
    );
};
