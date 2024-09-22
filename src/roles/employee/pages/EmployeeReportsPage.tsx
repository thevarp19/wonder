import { searchIcon } from "@/assets";
import { Title } from "@/components/shared/Title";
import { Image } from "@/components/ui/Image";
import { EmployeeReportTable } from "@/modules/report/components/EmployeeReportTable";
import { cn, useDebounce } from "@/utils/shared.util";
import { Button, ConfigProvider, DatePicker, Input, Menu } from "antd";
import { MenuProps } from "antd/lib";
import ruRU from "antd/lib/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { FC, useState } from "react";
export const items: MenuProps["items"] = [
    {
        label: "Передача",
        key: "shipped",
    },
    {
        label: "Возвраты",
        key: "refund",
    },
];
// export const deliveryModes: { [key: string]: RefundMode } = {
//     shipped: "NEW",
//     refund: "ON_DELIVERY",

// };
interface EmployeeReportsPageProps {}
const { RangePicker } = DatePicker;

export const EmployeeReportsPage: FC<EmployeeReportsPageProps> = ({}) => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const [current, setCurrent] = useState("shipped");
    const [dateRange, setDateRange] = useState<
        [dayjs.Dayjs | null, dayjs.Dayjs | null]
    >([null, null]);
    const [minDate, setMinDate] = useState<string | null>(null);
    const [maxDate, setMaxDate] = useState<string | null>(null);

    const handleDateChange = (
        dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]
    ) => {
        setDateRange(dates);
    };
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

    const handleApply = () => {
        if (dateRange[0] && dateRange[1]) {
            const formattedMinDate = dateRange[0]?.format("YYYY-MM-DD");
            const formattedMaxDate = dateRange[1]?.format("YYYY-MM-DD");

            setMinDate(formattedMinDate);
            setMaxDate(formattedMaxDate);
        }
    };

    return (
        <div className="h-full">
            {current === "shipped" && <Title text="Передача" />}
            {current === "refund" && <Title text="Возвраты" />}
            <div className="flex items-center justify-between pb-6">
                <div className="flex items-center justify-between"></div>
                <Button
                    size="large"
                    type="primary"
                    className="uppercase"
                    href="/employee/reports/create-report"
                >
                    Добавить накладную
                </Button>
            </div>
            <div className="flex flex-col gap-5">
                <div className="overflow-x-auto bg-[#F7F9FB] md:pt-0 pt-2 rounded-lg">
                    <div className="min-w-[600px] flex gap-10 ">
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
                        <div className="flex flex-col items-center w-full gap-4 py-2 ps-2 md:flex-row md:max-w-sm">
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
                                onClick={handleApply}
                            >
                                Применить
                            </Button>
                        </div>
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
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                    <EmployeeReportTable
                        searchValue={debouncedSearchValue}
                        min_date={minDate || ""}
                        max_date={maxDate || ""}
                    />
                </div>
            </div>
        </div>
    );
};
