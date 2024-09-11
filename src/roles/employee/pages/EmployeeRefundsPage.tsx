import { searchIcon } from "@/assets";
import { Title } from "@/components/shared/Title";
import { Image } from "@/components/ui/Image";
import { RefundsOrdersTable } from "@/modules/order/components/EmployeeOrders/EmployeeRefundsOrdersTable";
import { useGetExportRefundsFile } from "@/modules/order/queries";
import { RefundMode } from "@/modules/order/types";
import { cn } from "@/utils/shared.util";
import { App, Button, ConfigProvider, Input, Menu, MenuProps } from "antd";
import { FC, useCallback, useState } from "react";

interface EmployeeRefundsPageProps {}
export const items: MenuProps["items"] = [
    {
        label: "Новые",
        key: "new",
    },
    {
        label: "На доставке",
        key: "delivery",
    },
    {
        label: "Ожидают решения",
        key: "waiting",
    },
    {
        label: "Споры",
        key: "disputes",
    },
    {
        label: "Закрытые",
        key: "closed",
    },
];
export const deliveryModes: { [key: string]: RefundMode } = {
    new: "NEW",
    delivery: "ON_DELIVERY",
    waiting: "WAITING_DECISION",
    disputes: "DISPUTE",
    closed: "CLOSED",
};

export const EmployeeRefundsPage: FC<EmployeeRefundsPageProps> = ({}) => {
    const [searchValue, setSearchValue] = useState("");
    const [current, setCurrent] = useState("new");
    const { message } = App.useApp();
    const [refundMode, setRefundMode] = useState<RefundMode>("NEW");
    const { refetch: fetchExportFile } = useGetExportRefundsFile(refundMode);
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setRefundMode(deliveryModes[e.key]);
    };
    const handleExport = useCallback(async () => {
        try {
            const result = await fetchExportFile();
            if (result.data) {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Отчет о возвратах.pdf");
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        } catch (error) {
            message.error("Ошибка при экспорте файла!");
        }
    }, [fetchExportFile]);
    return (
        <div className="h-full">
            <div className="flex justify-between">
                <Title text="Возвраты" />

                <Button
                    size="large"
                    type="primary"
                    className="uppercase !min-w-[200px] "
                    onClick={handleExport}
                >
                    Скачать
                </Button>
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
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                    <RefundsOrdersTable refundMode={refundMode} />
                </div>
            </div>
        </div>
    );
};
