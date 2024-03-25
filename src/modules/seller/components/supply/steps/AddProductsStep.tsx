import { myLocalStorage } from "@/lib/storage/browserStorage";
import { ProductQuantity } from "@/modules/seller/types/supply";
import { cn } from "@/utils/shared.util";
import {
    App,
    Button,
    Form,
    InputNumber,
    Select,
    Table,
    TableColumnsType,
} from "antd";
import { FC, useState } from "react";
import { useGetProducts } from "../../../hooks/supply/useGetProducts";

interface AddProductsStepProps {}

export const AddProductsStep: FC<AddProductsStepProps> = ({}) => {
    const [products, setProducts] = useState<ProductQuantity[]>(
        myLocalStorage?.get("supply-products") || []
    );
    const columns: TableColumnsType<ProductQuantity> = [
        {
            title: "Article",
            render: (_, record) => <span>{record.product.vendorCode}</span>,
        },
        {
            title: "Name",
            render: (_, record) => (
                <a href={record.product.vendorCode}>{record.product.name}</a>
            ),
        },
        {
            title: "Price in Almaty",
            render: (_, record) => (
                <span>{record.product.prices[0].price}</span>
            ),
        },
        {
            title: "Quantity",
            render: (_, record) => (
                <span>
                    <Form.Item label="Quantity">
                        <InputNumber
                            name="quantity"
                            value={record.quantity}
                            onChange={(v) => {
                                setProducts((prev) =>
                                    prev.map((p) => ({
                                        ...p,
                                        quantity:
                                            p.product.id ===
                                                record.product.id &&
                                            typeof v === "number"
                                                ? v
                                                : p.quantity,
                                    }))
                                );
                            }}
                        />
                    </Form.Item>
                </span>
            ),
        },
        {
            title: "Delete",
            render: (_, record) => (
                <Button
                    danger
                    onClick={() => {
                        setProducts((prev) =>
                            prev.filter(
                                (product) =>
                                    product.product.vendorCode !==
                                    `${record.product.vendorCode}`
                            )
                        );
                    }}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const { message } = App.useApp();

    const { data: productOptions, isPending } = useGetProducts();
    return (
        <Form layout="vertical">
            <Form.Item label="Products" className="w-full">
                <Select
                    className="w-full"
                    mode="multiple"
                    allowClear
                    loading={isPending}
                    value={products.map((e) => e.product.vendorCode)}
                    onSelect={(value) => {
                        const p = productOptions?.find(
                            (product) => product.vendorCode === `${value}`
                        );
                        p &&
                            setProducts((prev) => [
                                ...prev,
                                { quantity: 1, product: p },
                            ]);
                    }}
                    onDeselect={(value) => {
                        setProducts((prev) =>
                            prev.filter(
                                (product) =>
                                    product.product.vendorCode !== `${value}`
                            )
                        );
                    }}
                    options={productOptions?.map((product) => ({
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
                dataSource={products}
                rowKey={(record) => record.product.vendorCode}
            />
            <div className={cn("flex justify-end")}>
                <Button
                    size="large"
                    type="primary"
                    className="mb-4"
                    onClick={() => {
                        myLocalStorage?.set("supply-products", products);
                        message.success("Products saved successfully");
                    }}
                >
                    Save
                </Button>
            </div>
        </Form>
    );
};
