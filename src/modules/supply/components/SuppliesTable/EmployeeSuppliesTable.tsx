import { CustomTable } from "@/components/ui/CustomTable";
import { padNumbers } from "@/utils/shared.util";
import { DownloadOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { App, Button, Select, TableColumnsType, Tooltip } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { editSupplyStatusMutation } from "../../mutations";
import { useGetEmployeeSupplies } from "../../queries";
import { GetEmployeeSuppliesContent } from "../../types";

interface EmployeeSuppliesTableProps {}

export const EmployeeSuppliesTable: FC<EmployeeSuppliesTableProps> = ({}) => {
    const [page, setPage] = useState(0);
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
    const { data, isPending } = useGetEmployeeSupplies(page, 10);
    const [localData, setLocalData] = useState<GetEmployeeSuppliesContent[]>(
        []
    );
    useEffect(() => {
        if (data?.content) {
            setLocalData(data.content);
        }
    }, [data]);
    const handleStatusChange = (id: number, newStatus: string) => {
        setLocalData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
    };

    const columns: TableColumnsType<GetEmployeeSuppliesContent> = [
        {
            title: "ID заявки",
            dataIndex: "id",
            render: (_, record) => (
                <Link to={`/employee/supplies/${record.id}`}>
                    {padNumbers(record.id, 8)}
                </Link>
            ),
        },

        {
            title: "Номер продавца",
            dataIndex: "seller_phone",
        },
        {
            title: "Название магазина",
            dataIndex: "seller_store",
        },

        {
            title: "Дата отправки",
            render: (_, record) => record.created_at?.substring(0, 10),
        },
        {
            title: "Дата приема",
            render: (_, record) => record.date?.substring(0, 10),
        },
        {
            title: "Статус",
            dataIndex: "status",
            render: (_, record) => {
                return (
                    <StatusSelect
                        record={record}
                        onStatusChange={handleStatusChange}
                    />
                );
            },
        },
        {
            title: "Заявлено",
            dataIndex: "declared_products",
        },
        {
            title: "Принято",
            dataIndex: "accepted_products",
        },

        {
            title: "Ошибка",
            dataIndex: "fallacy_products",
        },
        {
            title: "Брак",
            dataIndex: "defective_products",
        },
        {
            title: "Доверенность",
            dataIndex: "power_of_attorney",
            render: (_, record) => {
                return record.power_of_attorney ? (
                    <Link target="_blank" to={record.power_of_attorney}>
                        <Button
                            danger
                            icon={
                                <DownloadOutlined
                                    color="#ef7214"
                                    style={{ color: "#ef7214" }}
                                />
                            }
                        ></Button>
                    </Link>
                ) : (
                    <Tooltip title="Доверенность отсутствует">
                        <Button
                            danger
                            icon={
                                <DownloadOutlined
                                    color="#000000"
                                    style={{ color: "#000000" }}
                                />
                            }
                            disabled
                        ></Button>
                    </Tooltip>
                );
            },
        },
        {
            title: "Штрихкоды в А4",
            render: (_, record) => {
                return (
                    <Link target="_blank" to={record.report_a4}>
                        <Button
                            danger
                            loading={false}
                            icon={
                                <DownloadOutlined
                                    color="#ef7214"
                                    style={{ color: "#ef7214" }}
                                />
                            }
                        ></Button>
                    </Link>
                );
            },
        },
        {
            title: "Штрихкоды в ряд",
            render: (_, record) => {
                return (
                    <Link target="_blank" to={record.report_row}>
                        <Button
                            danger
                            loading={false}
                            icon={
                                <DownloadOutlined
                                    color="#ef7214"
                                    style={{ color: "#ef7214" }}
                                />
                            }
                        ></Button>
                    </Link>
                );
            },
        },
        // {
        //     title: "Отчет",
        //     render: (_, record) => {
        //         return (
        //             <Link target="_blank" to={record.report_a4}>
        //                 <Button
        //                     danger
        //                     loading={false}
        //                     icon={
        //                         <DownloadOutlined
        //                             color="#ef7214"
        //                             style={{ color: "#ef7214" }}
        //                         />
        //                     }
        //                 ></Button>
        //             </Link>
        //         );
        //     },
        // },
    ];

    return (
        <CustomTable
            loading={isPending}
            columns={columns}
            dataSource={localData}
            rowKey={(record) => record.id}
            pagination={{
                pageSize: 10,
                total: data?.totalElements,
                showSizeChanger: false,
                onChange(page) {
                    setPage(page - 1);
                },
                current: page + 1,
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
        />
    );
};
interface StatusSelectProps {
    record: GetEmployeeSuppliesContent;
    onStatusChange: (id: number, newStatus: string) => void;
}

const StatusSelect: FC<StatusSelectProps> = ({ record, onStatusChange }) => {
    const [status, setStatus] = useState(record.status);
    const { isPending, mutateAsync } = editSupplyStatusMutation(record.id);
    const { message } = App.useApp();
    const queryClient = useQueryClient();

    const handleStatusChange = async (newStatus: string) => {
        try {
            await mutateAsync({ status: newStatus });
            setStatus(newStatus);
            onStatusChange(record.id, newStatus);

            queryClient.invalidateQueries({
                queryKey: [`orders-employee-assemble`],
            });
        } catch (error) {
            message.error("Не удалось обновить статус");
        }
    };

    return (
        <Select
            value={status}
            loading={isPending}
            onChange={handleStatusChange}
            className="w-[150px]"
            options={[
                { value: "Отправлено", label: "Отправлено" },
                { value: "В процессе", label: "В процессе" },
                { value: "Брак", label: "Брак" },
                { value: "Ошибка", label: "Ошибка" },
                { value: "Принято", label: "Принято" },
            ]}
        />
    );
};
