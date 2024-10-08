import { CustomTable } from "@/components/ui/CustomTable";
import { DeleteButton } from "@/components/ui/DeleteButton";
import {
    useGetEnabledProductCount,
    useInfiniteGetProducts,
} from "@/modules/product/queries";
import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/seller/redux/supply/actions";
import { useSupplyProducts } from "@/roles/seller/redux/supply/selectors";
import { ProductQuantity } from "@/roles/seller/types/supply";
import { cn, useDebounce } from "@/utils/shared.util";
import { Form, InputNumber, Select, Spin, TableColumnsType } from "antd";
import { FC, useEffect, useState } from "react";
const { Option } = Select;
interface AddProductsStepProps {}

export const AddProductsStep: FC<AddProductsStepProps> = ({}) => {
    const products = useSupplyProducts();
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [isPublished, setIsPublished] = useState<boolean | null>(null);
    const debouncedSearchValue = useDebounce(searchValue, 600);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
        useInfiniteGetProducts(10, debouncedSearchValue, isPublished);
    const { data: productCount, isPending: enabledPending } =
        useGetEnabledProductCount();
    const handleSelectChange = (value: string) => {
        setIsPublished(
            value === "published"
                ? true
                : value === "unpublished"
                ? false
                : null
        );
    };
    useEffect(() => {
        setIsPublished(null);
    }, [searchValue]);
    const columns: TableColumnsType<ProductQuantity> = [
        {
            title: "Артикул",
            render: (_, record) => <span>{record.product.id}</span>,
        },
        {
            title: "Название",
            render: (_, record) => <span>{record.product.title}</span>,
        },
        {
            title: "Количество",
            render: (_, record) => (
                <span>
                    <Form.Item className="!mb-4">
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

    // const [isModalOpen, setIsModalOpen] = useState(false);

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
                {/* <Button type="primary" onClick={() => setIsModalOpen(true)}>
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
                </Modal> */}
            </div>
            <div className="flex gap-5">
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
                                label: `[${product.vendor_code}] - ${product.title} `,
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
                <Select
                    className="!min-w-[200px]"
                    placeholder="Статус"
                    onChange={handleSelectChange}
                    value={
                        isPublished === true
                            ? "published"
                            : isPublished === false
                            ? "unpublished"
                            : ""
                    }
                >
                    <Option value="">Не выбрано</Option>
                    <Option value="published">
                        {`Опубликовано (${
                            enabledPending ? (
                                <Spin size="small" />
                            ) : (
                                productCount?.enabled_count
                            )
                        })`}
                    </Option>
                    <Option value="unpublished">
                        {`Не опубликовано (${
                            enabledPending ? (
                                <Spin size="small" />
                            ) : (
                                productCount?.not_enabled_count
                            )
                        })`}
                    </Option>
                </Select>
            </div>

            <CustomTable
                pagination={false}
                columns={columns}
                className={cn("mb-4")}
                dataSource={products}
                rowKey={(record) => record.product.id}
            />
        </Form>
    );
};
