import { PriceCell } from "@/components/ui/PriceCell";
import { Table, TableColumnsType } from "antd";
import { FC } from "react";
// import { useGetOrder } from "../../queries";
import { useGetSellerOrder } from "../../queries";
import { GetOrderById } from "../../types";

interface SellerOrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<GetOrderById> = [
    {
        title: "ID",
        render: (_, record) => (
            // <Link to={`/product/${record.productVendorCode}`}>
            <span>{record.productVendorCode}</span>
            // </Link>
        ),
    },
    {
        title: "Артикул",
        dataIndex: "productArticle",
    },
    {
        title: "Название продукта",
        dataIndex: "productName",
    },
    {
        title: "Номер ячейки",
        dataIndex: "cellCode",
    },
    {
        title: "Артикул поставщика",
        dataIndex: "productVendorCode",
    },
    {
        title: "Цена продажи",
        dataIndex: "productSellPrice",
        render: (text) => <PriceCell price={text} />,
    },
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

export const SellerOrderDetailsTable: FC<SellerOrderDetailsTableProps> = ({
    orderId,
}) => {
    const { data, isPending } = useGetSellerOrder(orderId);

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={"productVendorCode"}
            loading={isPending}
        />
    );
};
