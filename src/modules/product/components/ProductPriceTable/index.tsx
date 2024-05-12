import { Button, Checkbox, Modal, Table, TableColumnsType } from "antd";
import clsx from "clsx";
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
        render: (_, record) => (
            <a href={record.vendorCode} className="text-nowrap">
                {record.name}
            </a>
        ),
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

function findProductPriceAndCountInCity(
    storeName: string,
    record: ProductPrice
) {
    let result = {
        price: 0,
        count: 0,
    };
    record.prices.forEach((price) => {
        if (price.cityName.toLowerCase() === storeName.toLowerCase()) {
            result.price = price.price;
            result.count = record.count;
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
            render: (_: any, record: ProductPrice) => {
                const { price, count } = findProductPriceAndCountInCity(
                    store,
                    record
                );
                return (
                    <div className="relative w-full h-full ">
                        <div
                            className={clsx(
                                "absolute -top-[16px] -left-[16px] h-[55px] w-full",
                                `bg-[${getColorFromCount(count)}]`
                            )}
                        ></div>
                        <div className="relative font-semibold">
                            {price} KZT
                        </div>
                    </div>
                );
            },
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
                rowKey={(r) => r.id}
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

function getColorFromCount(count: number) {
    // Ensure count is within the bounds
    count = Math.min(Math.max(count, 0), 1000);

    // Calculate the interpolation factor (0 at count = 0 and 1 at count = 1000)
    const factor = count / 1000;

    // Yellow to Purple transition
    // Start values (Yellow): 255, 255, 0
    // End values (Purple): 128, 0, 128

    // Interpolate red component
    const red = Math.round(255 - 127 * factor); // 255 to 128
    // Interpolate green component
    const green = Math.round(255 - 255 * factor); // 255 to 0
    // Interpolate blue component
    const blue = Math.round(0 + 128 * factor); // 0 to 128

    return `rgb(${red},${green},${blue})`;
}
