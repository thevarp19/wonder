import { SearchInput } from "@/components/ui/SearchInput";
import { UpdateSizesForm } from "@/modules/product/components/UpdateSizesForm";
import { useUpdateProductSize } from "@/modules/product/forms";
import { useGetProductsWithSizes } from "@/modules/product/queries";
import { useScannerResults } from "@/modules/scan/hooks";
import { toScanProductsSizes } from "@/modules/scan/utils";
import { EditOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps, Modal, Table, TableColumnsType } from "antd";
import { FC, useEffect, useState } from "react";
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
    const scanSearchValue = useScannerResults();
    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        setSearchQuery(searchValue);
    };
    useEffect(() => {
        if (scanSearchValue) {
            setSearchQuery(scanSearchValue);
            setSearchValue(scanSearchValue);
        }
    }, [scanSearchValue]);
    return (
        <div>
            <div className="flex items-center justify-between gap-20 mb-4">
                <div className="flex items-center justify-between max-w-md gap-8 grow">
                    <div className="w-full max-w-sm">
                        <SearchInput
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onSearch={handleSearch}
                        />
                    </div>
                    {/* <div>
                        <FilterButton />
                    </div> */}
                </div>
                <div>
                    <Button
                        size="large"
                        type="primary"
                        onClick={toScanProductsSizes}
                        className="uppercase"
                    >
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
            <EmployeeSearchResultsTable searchValue={searchQuery} />
        </div>
    );
};

const columns: TableColumnsType<any> = [
    {
        title: "Артикул",
        dataIndex: "productArticle",
        key: "productArticle",
    },
    {
        title: "Наименование",
        render: (_, record) => (
            <Link to={`/product/${record.productArticle}`}>
                {record.productName}
            </Link>
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
        render: (_, record) => (
            <UpdateSizesModal
                vendorCode={record.vendorCode}
                productName={record.productName}
            />
        ),
    },
];

const UpdateSizesModal = ({
    vendorCode,
    productName,
}: {
    vendorCode: string;
    productName: string;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const primaryVendorCode = vendorCode.split("_")[0];
    const { formik } = useUpdateProductSize(primaryVendorCode);
    return (
        <>
            <Modal
                open={isModalOpen}
                confirmLoading={formik.isSubmitting}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => {
                    formik.submitForm();
                    setIsModalOpen(false);
                }}
                destroyOnClose
            >
                <div className="flex flex-col gap-2">
                    <div className="py-2"> Артикул: {vendorCode}</div>
                    <div className="py-2">
                        {" "}
                        Наименование:{" "}
                        <span className="underline">{productName}</span>
                    </div>
                    <UpdateSizesForm formik={formik} />
                </div>
            </Modal>
            <EditOutlined
                onClick={() => setIsModalOpen(true)}
                style={{ fontSize: "24px" }}
            />
        </>
    );
};

export const EmployeeSearchResultsTable: FC<{ searchValue: string }> = ({
    searchValue,
}) => {
    const [page, setPage] = useState(0);
    const { data, isPending } = useGetProductsWithSizes(
        page,
        undefined,
        searchValue,
        true,
        true,
        true,
        true,
        true
    );
    return (
        <Table
            columns={columns}
            loading={isPending}
            dataSource={data?.content}
            rowKey={(record) => record.vendorCode}
            pagination={{
                pageSize: 10,
                total: data?.totalElements,
                showSizeChanger: false,
                onChange(page) {
                    setPage(page - 1);
                },
                current: page + 1,
            }}
        />
    );
};
