import { FormikInput, FormikItem } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Select, Table, TableColumnsType } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { getSellerProducts } from "../api/shared";
import { useSupply } from "../hooks/useSupply";
import { SellerProductsResponse } from "../types/api";

interface SellerSupplyPageProps {}

export const SellerSupplyPage: FC<SellerSupplyPageProps> = ({}) => {
    const { formik } = useSupply();
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
                    <FormikInput
                        formItemProps={{ label: "Quantity" }}
                        inputProps={{ type: "number" }}
                        formik={formik}
                        name="quantity"
                    />
                </span>
            ),
        },
    ];
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
                            value={formik.values.products.map(
                                (e) => e.vendorCode
                            )}
                            onSelect={(value) => {
                                formik.setFieldValue("products", [
                                    ...formik.values.products,
                                    products?.find(
                                        (product) =>
                                            product.vendorCode === `${value}`
                                    ),
                                ]);
                            }}
                            onDeselect={(value) => {
                                formik.setFieldValue(
                                    "products",
                                    formik.values.products.filter(
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
                        dataSource={formik.values.products}
                        rowKey={"vendorCode"}
                    />

                    <FormikItem
                        name="comment"
                        formik={formik}
                        formItemProps={{
                            label: "Comment",
                        }}
                    >
                        <TextArea />
                    </FormikItem>
                    <div className={cn("flex justify-end")}>
                        <Button
                            size="large"
                            type="primary"
                            className="mb-4"
                            href="/seller/products/upload"
                        >
                            Supply
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
