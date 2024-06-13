import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
// import { useGetOrder } from "../../queries";
import { useGetEmployeeOrder } from "../../queries";
import { Product } from "../../types";

interface EmployeeOrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<Product> = [
    {
        title: "ID",
        render: (_, record) => (
            <Link to={`/product/${record.id}`}>{record.id}</Link>
        ),
    },
    {
        title: "Артикул",
        dataIndex: "article",
    },
    {
        title: "Название продукта",
        dataIndex: "name",
    },
    {
        title: "Номер ячейки",
        dataIndex: "cellCode",
    },
    // {
    //     title: "Артикул поставщика",
    //     dataIndex: "productVendorCode",
    // },
    // {
    //     title: "Цена продажи",
    //     dataIndex: "productSellPrice",
    //     render: (text) => <PriceCell price={text} />,
    // },
    // {
    //     title: "Статус",
    //     render: (_) => <OrderStatusCell status={"Не сканировано"} />,
    // },
];

// export const OrderStatusCell: FC<{ status: string }> = ({ status }) => {
//     return (
//         <div className="flex items-center gap-4">
//             {status}
//             {status === "Не сканировано" && (
//                 <Button type="primary" size="small">
//                     Скан
//                 </Button>
//             )}
//         </div>
//     );
// };

export const EmployeeOrderDetailsTable: FC<EmployeeOrderDetailsTableProps> = ({
    orderId,
}) => {
    const { data, isPending } = useGetEmployeeOrder(orderId);

    return (
        <Table
            columns={columns}
            dataSource={data?.products}
            rowKey={"id"}
            loading={isPending}
        />
    );
};
