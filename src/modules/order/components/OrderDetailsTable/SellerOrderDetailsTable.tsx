import { PriceCell } from "@/components/ui/PriceCell";
import { Button, TableColumnsType } from "antd";
import { FC } from "react";
// import { useGetOrder } from "../../queries";
import { CustomTable } from "@/components/ui/CustomTable";
import { DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import { GetOrderById } from "../../types";

interface SellerOrderDetailsTableProps {
    orderId: number;
}

const columns: TableColumnsType<any> = [
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
    {
        title: "Баркоды коробки",
        render: (_, record) => {
            return (
                <Link target="_blank" to={record.pathToBoxBarcode}>
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
            );
        },
    },
    {
        title: "Баркоды продуктов",
        render: (_, record) => {
            return (
                <Link target="_blank" to={record.pathToProductBarcode}>
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
            );
        },
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

export const SellerOrderDetailsTable: FC<
    SellerOrderDetailsTableProps
> = ({}) => {
    // const { data, isPending } = useGetSellerOrder(orderId);

    return (
        <CustomTable
            columns={columns}
            dataSource={[]}
            rowKey={"productVendorCode"}
            loading={false}
        />
    );
};
