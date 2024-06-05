import { SearchInput } from "@/components/ui/SearchInput";
import { UpdateSizesForm } from "@/modules/product/components/UpdateSizesForm";
import { EditOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps, Modal, Table, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface EmployeeProductSizesPageProps {}
const items: MenuProps["items"] = [
    {
        label: "Все",
        key: "all",
    },
    {
        label: "Отсканированные",
        key: "scanned",
    },
    {
        label: "Не отсканированные",
        key: "non-scanned",
    },
];
export const EmployeeProductSizesPage: FC<
    EmployeeProductSizesPageProps
> = ({}) => {
    const [current, setCurrent] = useState("all");

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-20 mb-4">
                <div className="flex items-center justify-between max-w-md gap-8 grow">
                    <div className="w-full max-w-sm">
                        <SearchInput
                            searchValue={""}
                            setSearchValue={() => {}}
                            onSearch={() => {}}
                        />
                    </div>
                    {/* <div>
                        <FilterButton />
                    </div> */}
                </div>
                <div>
                    <Button size="large" type="primary" className="uppercase">
                        CКАНИРОВАТЬ
                    </Button>
                </div>
            </div>
            <Menu
                items={items}
                mode="horizontal"
                onClick={onClick}
                selectedKeys={[current]}
            />
            <EmployeeSearchResultsTable searchValue={""} />
        </div>
    );
};

const columns: TableColumnsType<any> = [
    {
        title: "Артикул",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Наименование",
        render: (_, record) => (
            <Link to={`/product/${record.id}`}>{record.name}</Link>
        ),
    },
    {
        title: "Длина",
        dataIndex: "length",
    },
    {
        title: "Ширина",
        dataIndex: "width",
    },
    {
        title: "Высота",
        dataIndex: "height",
    },
    {
        title: "Вес",
        dataIndex: "weight",
    },
    {
        title: "Комментарий",
        dataIndex: "comment",
    },
    // {
    //     title: "",
    //     render: () => (
    //         <Button type="primary" className="uppercase" size="small">
    //             Скан
    //         </Button>
    //     ),
    // },
    {
        title: "",
        render: () => <UpdateSizesModal productId={1} />,
    },
];

const UpdateSizesModal = ({ productId }: { productId: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                destroyOnClose
            >
                <div>
                    <div> Артикул: {productId}</div>
                    <div>
                        {" "}
                        Наименование:{" "}
                        <span className="underline">Product name</span>
                    </div>
                    <UpdateSizesForm productId={productId} />
                </div>
            </Modal>
            <EditOutlined
                onClick={() => setIsModalOpen(true)}
                style={{ fontSize: "24px" }}
            />
        </>
    );
};

export const EmployeeSearchResultsTable: FC<{ searchValue: string }> = ({}) => {
    return (
        <Table
            dataSource={[
                {
                    id: 1,
                    name: "Product name",
                    length: 1,
                    width: 2,
                    height: 3,
                    weight: 4,
                    comment: "Comment",
                },
            ]}
            columns={columns}
        />
    );
};
