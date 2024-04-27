import { Button, Checkbox, Modal, Table, TableColumnsType } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useGetProducts } from "../../queries";
import { GetProductResponse } from "../../types";

interface ProductPriceTableProps {}

const columns: TableColumnsType<GetProductResponse> = [
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
        render: () => <div className="">0</div>,
        width: 100,
        fixed: "left",
    },
    {
        title: "Almaty",
        render: (_, record) => <span>{record.prices[0].price}</span>,
        width: 120,
    },
    {
        title: "Astana",
        width: 120,
        render: (_, record) => <span>{record.prices[1].price}</span>,
    },
];

const mockStores = [
    {
        name: "Shymkent",
    },
    {
        name: "Karaganda",
    },
    {
        name: "Aktobe",
    },
    {
        name: "Atyrau",
    },
    {
        name: "Kostanay",
    },
    {
        name: "Kokshetau",
    },
    {
        name: "Kyzylorda",
    },
];

function StoreCheckboxes({
    setChecked,
}: {
    setChecked: Dispatch<SetStateAction<string[]>>;
}) {
    return (
        <div className="flex flex-col gap-4">
            {mockStores.map((store) => (
                <div key={store.name}>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setChecked((prev) => [...prev, store.name]);
                            } else {
                                setChecked((prev) =>
                                    prev.filter((name) => name !== store.name)
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

export const ProductPriceTable: FC<ProductPriceTableProps> = ({}) => {
    const { data: products, isPending } = useGetProducts();
    const [activeStores, setActiveStores] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const newColumns = [
        ...columns,
        ...activeStores.map((store) => ({
            title: `${store}`,
            width: 120,
            render: () => <span>{0}</span>,
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
                <StoreCheckboxes setChecked={setActiveStores} />
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
                dataSource={products}
                rowKey={"article"}
                scroll={{ x: 1200 }}
            />
        </div>
    );
};
