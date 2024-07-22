import { DeleteButton } from "@/components/ui/DeleteButton";
import { ProductsUploadFromFile } from "@/modules/product/components/ProductsUploadFromFile";
import { useInfiniteGetProducts } from "@/modules/product/queries";
import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/seller/redux/supply/actions";
import { useSupplyProducts } from "@/roles/seller/redux/supply/selectors";
import { ProductQuantity } from "@/roles/seller/types/supply";
import { cn, useDebounce } from "@/utils/shared.util";
import {
    Button,
    Form,
    InputNumber,
    Modal,
    Select,
    Table,
    TableColumnsType,
} from "antd";
import { FC, useState } from "react";

interface AddProductsStepProps {}

export const AddProductsStep: FC<AddProductsStepProps> = ({}) => {
    const products = useSupplyProducts();
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
        useInfiniteGetProducts(10, debouncedSearchValue);

    const columns: TableColumnsType<ProductQuantity> = [
        {
            title: "Артикул",
            render: (_, record) => <span>{record.product.id}</span>,
        },
        {
            title: "Название",
            render: (_, record) => (
                <a href={record.product.vendor_code}>{record.product.title}</a>
            ),
        },
        // {
        //     title: "Цена в Алматы",
        //     render: (_, record) => (
        //         <span>{record.product.counts[0].price}</span>
        //     ),
        // },
        {
            title: "Количество",
            render: (_, record) => (
                <span>
                    <Form.Item label="Количество" className="!mb-4">
                        <InputNumber
                            name="quantity"
                            min={0}
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
            title: "Удалить",
            render: (_, record) => (
                <DeleteButton
                    onConfirm={() => {
                        dispatch(actions.removeProduct(record.product.id));
                    }}
                />
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePopupScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (!isFetchingNextPage) {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            if (scrollTop + clientHeight >= scrollHeight - 50 && hasNextPage) {
                fetchNextPage();
            }
        }
    };
    return (
        <Form layout="vertical">
            <h1 className="text-2xl font-semibold">
                Пожалуйста, добавьте продукты
            </h1>
            <div className="my-4">
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Загрузить из файла
                </Button>
                <Modal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    okButtonProps={{ style: { display: "none" } }}
                    cancelButtonProps={{ style: { display: "none" } }}
                >
                    <ProductsUploadFromFile
                        setProducts={(products) => {
                            dispatch(actions.setProducts(products));
                            setIsModalOpen(false);
                        }}
                    />
                </Modal>
            </div>
            <Form.Item className="w-full !mb-4">
                <Select
                    className="w-full"
                    mode="multiple"
                    allowClear
                    loading={isPending}
                    value={products.map((e: any) => e.product.id)}
                    onSelect={(value) => {
                        const p = data?.pages
                            .flatMap((page) => page.content)
                            .find((product) => product.id === value);
                        p &&
                            dispatch(
                                actions.addProduct({
                                    ...p,
                                    warehouse_quantities: [],
                                    price: "",
                                })
                            );
                    }}
                    onDeselect={(value) => {
                        dispatch(actions.removeProduct(Number(value)));
                    }}
                    searchValue={searchValue}
                    onSearch={setSearchValue}
                    onPopupScroll={handlePopupScroll}
                    options={data?.pages.flatMap((page) =>
                        page.content.map((product) => ({
                            label: product.title,
                            value: product.id,
                        }))
                    )}
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
