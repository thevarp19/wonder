import { cn } from "@/utils/shared.util";
import { useQuery } from "@tanstack/react-query";
import {
    Button,
    Form,
    InputNumber,
    Select,
    Table,
    TableColumnsType,
} from "antd";
import { FC, useState } from "react";
import { getSellerProducts } from "../api/shared";
import { SellerProductsResponse } from "../types/api";

interface SellerSupplyPageProps {}

export const SellerSupplyPage: FC<SellerSupplyPageProps> = ({}) => {
    const columns: TableColumnsType<SellerProductsResponse> = [
        {
            title: "Article",
            dataIndex: "vendorCode",
        },
        {
            title: "Name",
            render: (_, record) => (
                <a href={record.vendorCode}>{record.name}</a>
            ),
        },
        {
            title: "Price in Almaty",
            render: (_, record) => <span>{record.prices[0].price}</span>,
        },
        {
            title: "Quantity",
            render: (_) => (
                <span>
                    <Form.Item label="Quantity">
                        <InputNumber name="quantity" />
                    </Form.Item>
                </span>
            ),
        },
    ];
    const [temp, setTemp] = useState<SellerProductsResponse[]>([]);
    const { data: products } = useQuery<SellerProductsResponse[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await getSellerProducts();
            return data;
        },
    });
    return (
        <div className="min-h-full bg-white rounded-t-lg">
            <div className="p-4">
                <h1 className="pb-4 text-2xl font-semibold">Supply</h1>
                <Form layout="vertical">
                    <Form.Item label="Products" className="w-full">
                        <Select
                            className="w-full"
                            mode="multiple"
                            allowClear
                            value={temp.map((e) => e.vendorCode)}
                            onSelect={(value) => {
                                const p = products?.find(
                                    (product) =>
                                        product.vendorCode === `${value}`
                                );
                                p && setTemp((prev) => [...prev, p]);
                            }}
                            onDeselect={(value) => {
                                setTemp((prev) =>
                                    prev.filter(
                                        (product) =>
                                            product.vendorCode !== `${value}`
                                    )
                                );
                            }}
                            options={products?.map((product) => ({
                                label: product.name,
                                value: product.vendorCode,
                            }))}
                            filterOption={(input, option) =>
                                !!option?.label
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                    <Table
                        pagination={false}
                        columns={columns}
                        className={cn("mb-4")}
                        dataSource={temp}
                        rowKey={"vendorCode"}
                    />
                    <div className={cn("flex justify-end")}>
                        <Button
                            size="large"
                            type="primary"
                            className="mb-4"
                            href="/seller/products/upload"
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
