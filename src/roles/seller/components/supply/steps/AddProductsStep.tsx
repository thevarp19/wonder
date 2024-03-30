import { useGetProducts } from "@/modules/product/queries";
import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/seller/redux/supply/actions";
import { useSupplyProducts } from "@/roles/seller/redux/supply/selectors";
import { ProductQuantity } from "@/roles/seller/types/supply";
import { cn } from "@/utils/shared.util";
import {
    Button,
    Form,
    InputNumber,
    Select,
    Table,
    TableColumnsType,
} from "antd";
import { FC } from "react";

interface AddProductsStepProps {}

export const AddProductsStep: FC<AddProductsStepProps> = ({}) => {
    const products = useSupplyProducts();
    const dispatch = useAppDispatch();
    const { data: productOptions, isPending } = useGetProducts();

    const columns: TableColumnsType<ProductQuantity> = [
        {
            title: "Article",
            render: (_, record) => <span>{record.product.id}</span>,
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
                                if (typeof v === "number")
                                    dispatch(
                                        actions.updateProductQuantity(
                                            record.product.id,
                                            v
                                        )
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
                        dispatch(actions.removeProduct(record.product.id));
                    }}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <Form layout="vertical">
            <Form.Item label="Products" className="w-full">
                <Select
                    className="w-full"
                    mode="multiple"
                    allowClear
                    loading={isPending}
                    value={products.map((e) => e.product.id)}
                    onSelect={(value) => {
                        const p = productOptions?.find(
                            (product) => product.id === value
                        );
                        p && dispatch(actions.addProduct(p));
                    }}
                    onDeselect={(value) => {
                        dispatch(actions.removeProduct(Number(value)));
                    }}
                    options={productOptions?.map((product) => ({
                        label: product.name,
                        value: product.id,
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
                rowKey={(record) => record.product.id}
            />
        </Form>
    );
};
