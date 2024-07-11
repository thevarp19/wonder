import { employeesIcon, pencilIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { cn } from "@/utils/shared.util";
import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetStores } from "../../queries";
import { StoreAddressCell } from "./StoreAddressCell";
import { StoreBoxesModal } from "./StoreBoxesModal";
import { StoreSwitch } from "./StoreSwitch";
import { StoreWorkingTimeCell } from "./StoreWorkingTimeCell";

interface StoresTableProps {}

const columns: TableColumnsType<any> = [
    {
        title: "ID",
        dataIndex: "kaspiId",
    },
    {
        title: "Адрес",
        render: (_, record) => <StoreAddressCell {...record} />,
    },
    {
        title: "Рабочее время",
        render: (_, record) => (
            <StoreWorkingTimeCell dayOfWeeks={record.availableWorkTimes} />
        ),
    },
    {
        title: "Статус",
        render: (_, record) => <StoreSwitch record={record} />,
    },
    {
        title: "Ячейки",
        render: (_, record) => (
            <Link
                to={`/admin/settings/cells/${record.id}`}
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
                to={`/admin/settings/update-store/${record.id}`}
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
                to={`/admin/settings/employees/${record.id}`}
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
            <StoreBoxesModal
                storeId={`${record.id}`}
                boxTypes={record.availableBoxTypes}
            />
        ),
    },
];

export const StoresTable: FC<StoresTableProps> = ({}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
    // const mockData = [
    //     {
    //         id: 1,
    //         kaspiId: "KASPI123",
    //         streetName: "Main Street",
    //         streetNumber: "123",
    //         formattedAddress: "123 Main Street",
    //         city: { id: 1, name: "City" },
    //         availableWorkTimes: [
    //             { dayOfWeek: "Monday", startTime: "09:00", endTime: "18:00" },
    //             { dayOfWeek: "Tuesday", startTime: "09:00", endTime: "18:00" },
    //             {
    //                 dayOfWeek: "Wednesday",
    //                 startTime: "09:00",
    //                 endTime: "18:00",
    //             },
    //             { dayOfWeek: "Thursday", startTime: "09:00", endTime: "18:00" },
    //             { dayOfWeek: "Friday", startTime: "09:00", endTime: "18:00" },
    //         ],
    //         availableBoxTypes: [
    //             { id: 1, name: "Box 1" },
    //             { id: 2, name: "Box 2" },
    //             { id: 3, name: "Box 3" },
    //         ],
    //         enabled: true,
    //         userId: 1,
    //     },
    // ];

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
                dataSource={stores?.sort((a, b) => a.id - b.id) || []}
                rowKey={"id"}
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
