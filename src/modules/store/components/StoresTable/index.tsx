import { employeesIcon, pencilIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { cn } from "@/utils/shared.util";
import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetStores } from "../../queries";
import { GetStoreResponse } from "../../types";
import { StoreBoxesModal } from "./StoreBoxesModal";
import { StoreSwitch } from "./StoreSwitch";
import { StoreWorkingTimeCell } from "./StoreWorkingTimeCell";

interface StoresTableProps {}

const columns: TableColumnsType<GetStoreResponse> = [
    {
        title: "ID",
        render: (_, record) => `${record.warehouse.id}`,
    },
    {
        title: "Адрес",
        render: (_, record) => (
            <div>{record.warehouse.formatted_address || ""}</div>
        ),
    },
    {
        title: "Рабочее время",
        render: (_, record) => (
            <StoreWorkingTimeCell
                dayOfWeeks={record.warehouse.operating_modes}
            />
        ),
    },

    {
        title: "Статус",
        render: (_, record) => <StoreSwitch record={record} />,
    },
    {
        title: "Склад",
        render: (_, record) => (record.warehouse.is_warehouse ? "Да" : "Нет"),
    },
    {
        title: "Ячейки",
        render: (_, record) => (
            <Link
                to={`/admin/settings/cells/${record.warehouse.id}`}
                className="cursor-pointer"
            >
                <Button className="!rounded-[16px]">Ячейки</Button>
            </Link>
        ),
    },
    {
        title: "Редактировать",
        render: (_, record) => (
            <Link
                to={`/admin/settings/update-store/${record.warehouse.id}`}
                className="cursor-pointer"
            >
                <Image
                    src={pencilIcon}
                    alt="pencilIcon"
                    className={cn("w-7 h-7")}
                />
            </Link>
        ),
    },
    {
        title: "Сотрудники",
        render: (_, record) => (
            <Link
                to={`/admin/settings/employees/${record.warehouse.id}`}
                className="cursor-pointer"
            >
                <Image
                    src={employeesIcon}
                    alt="employeesIcon"
                    className={cn("w-7 h-7")}
                />
            </Link>
        ),
    },
    {
        title: "Типы коробок",
        render: (_, record) => (
            <StoreBoxesModal storeId={record.warehouse.id} />
        ),
    },
];

export const StoresTable: FC<StoresTableProps> = ({}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
    const { data: stores, isPending } = useGetStores();

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "#fff",
                        headerColor: "#1C1C1C66",
                        headerBorderRadius: 10,
                        headerSplitColor: "#fff",
                    },
                },
            }}
        >
            <Table
                columns={columns}
                dataSource={
                    stores?.sort((a, b) => a.warehouse.id - b.warehouse.id) ||
                    []
                }
                rowKey={(record) => record.warehouse.id}
                loading={isPending}
                locale={{
                    emptyText: "Нет данных",
                }}
                pagination={{
                    position: isSmallScreen ? ["bottomCenter"] : undefined,
                }}
                scroll={{ x: "max-content" }}
            />
        </ConfigProvider>
    );
};
