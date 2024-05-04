import { Button, Checkbox, Modal, Table, TableColumnsType } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useGetProductsPrices } from "../../queries";
import { ProductPrice, ProductPriceCity } from "../../types";

interface ProductPriceTableProps {}

const columns: TableColumnsType<ProductPrice> = [
    {
        title: "Article",
        dataIndex: "vendorCode",
        fixed: "left",
        width: 200,
    },
    {
        title: "Name",
        render: (_, record) => <a href={record.vendorCode}>{record.name}</a>,
        fixed: "left",
        width: 250,
    },
    {
        title: "Count",
        render: (_, record) => <div className="">{record.count}</div>,
        width: 100,
        fixed: "left",
    },
];

function StoreCheckboxes({
    setChecked,
    stores,
}: {
    setChecked: Dispatch<SetStateAction<string[]>>;
    stores: ProductPriceCity[];
}) {
    return (
        <div className="flex flex-col gap-4">
            {stores.map((store) => (
                <div key={store.name.toLowerCase()}>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setChecked((prev) => [
                                    ...prev,
                                    store.name.toLowerCase(),
                                ]);
                            } else {
                                setChecked((prev) =>
                                    prev.filter(
                                        (name) =>
                                            name.toLowerCase() !==
                                            store.name.toLowerCase()
                                    )
                                );
                            }
                        }}
                    >
                        {store.name}
                    </Checkbox>
                </div>
            ))}
        </div>
    );
}

function findProductPriceInCity(
    storeName: string,
    record: ProductPrice
): number {
    let result = 0;
    record.prices.forEach((price) => {
        if (price.cityName.toLowerCase() === storeName.toLowerCase()) {
            result = price.price;
        }
    });
    return result;
}

export const ProductPriceTable: FC<ProductPriceTableProps> = ({}) => {
    const [page, setPage] = useState(0);
    const { data: products, isPending } = useGetProductsPrices(page);
    const [activeStores, setActiveStores] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const newColumns = [
        ...columns,
        ...activeStores.map((store) => ({
            title: `${store.toLocaleUpperCase()}`,
            width: 120,
            render: (_: any, record: ProductPrice) => (
                <span>{findProductPriceInCity(store, record)}</span>
            ),
        })),
    ];
    return (
        <div>
            <Modal
                title="stores"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                onOk={() => {
                    setIsModalOpen(false);
                }}
            >
                <StoreCheckboxes
                    setChecked={setActiveStores}
                    stores={products?.content[0].cities || []}
                />
            </Modal>
            <div className="flex justify-end px-4 mb-4">
                <Button
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                    type="primary"
                >
                    Stores
                </Button>
            </div>
            <Table
                columns={newColumns}
                loading={isPending}
                dataSource={products?.content[0].products}
                rowKey={"article"}
                scroll={{ x: 1200 }}
                pagination={{
                    pageSize: 10,
                    total: products?.totalElements,
                    showSizeChanger: false,
                    onChange(page) {
                        setPage(page - 1);
                    },
                    current: page + 1,
                }}
            />
        </div>
    );
};
