import { scan } from "@/assets";
import { Title } from "@/components/shared/Title";
import { CustomTable } from "@/components/ui/CustomTable";
import { Image } from "@/components/ui/Image";
import { SearchInput } from "@/components/ui/SearchInput";
import { UpdateSizesForm } from "@/modules/product/components/UpdateSizesForm";
import { useUpdateProductSize } from "@/modules/product/forms";
import { useGetProductsWithSizes } from "@/modules/product/queries";
import { ProductSizes } from "@/modules/product/types";
import { useScannerResults } from "@/modules/scan/hooks";
import { toScanProductsSizes } from "@/modules/scan/utils";
import { cn } from "@/utils/shared.util";
import { EditOutlined } from "@ant-design/icons";
import {
    Button,
    ConfigProvider,
    Menu,
    MenuProps,
    Modal,
    TableColumnsType,
} from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface EmployeeProductSizesPageProps {}

const items: MenuProps["items"] = [
    {
        label: "Все",
        key: "all",
    },
    {
        label: "Известные",
        key: "scanned",
    },
    {
        label: "Не известные",
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

            const newSearchParams = new URLSearchParams(window.location.search);
            newSearchParams.delete("result");
            newSearchParams.delete("type");
            newSearchParams.delete("step");
            const newUrl = `${
                window.location.pathname
            }?${newSearchParams.toString()}`;
            window.history.replaceState(null, "", newUrl);
        }
    }, [scanSearchValue]);

    return (
        <div className="flex flex-col">
            <Title text="Размеры" />

            <div className="md:bg-[#F7F9FB] bg-[#fff] px-2 rounded-lg mb-5 flex flex-col gap-10 md:gap-0">
                <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
                    <div className="flex items-center justify-between w-full md:max-w-md max-w">
                        <SearchInput
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onSearch={handleSearch}
                        />
                    </div>
                    <div
                        onClick={() => {
                            toScanProductsSizes;
                        }}
                        className="flex items-center justify-center bg-[#EF7214] rounded-md cursor-pointer py-[14px] md:w-[130px] w-full md:max-h-[32px] max-h-[47px] gap-2 px-2"
                    >
                        <Image
                            src={scan}
                            alt="scan"
                            className={cn("min-w-4 h-4")}
                        />
                        <h2 className="md:text-[12px] text-[16px] text-white">
                            CКАНИРОВАТЬ
                        </h2>
                    </div>
                </div>
                <div className="bg-[#F7F9FB] p-2 md:p-0 rounded-lg">
                    <ConfigProvider
                        theme={{
                            components: {
                                Menu: {
                                    itemBg: "#F7F9FB",
                                    colorSplit: "#F7F9FB",
                                },
                            },
                        }}
                    >
                        <Menu
                            items={items}
                            mode="horizontal"
                            className="w-full !font-bold"
                            onClick={onClick}
                            selectedKeys={[current]}
                        />
                    </ConfigProvider>
                </div>
            </div>
            <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                <EmployeeSearchResultsTable
                    searchValue={searchQuery}
                    filterKey={current}
                />
            </div>
        </div>
    );
};

const columns: TableColumnsType<any> = [
    {
        title: "Vendor Код",
        dataIndex: "vendor_code",
        key: "vendor_code",
    },
    {
        title: "Наименование",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Длина",
        dataIndex: ["product_size", "length"],
        key: "length",
        render: (length: number) => (length ? length : "-"),
    },
    {
        title: "Ширина",
        dataIndex: ["product_size", "width"],
        key: "width",
        render: (width: number) => (width ? width : "-"),
    },
    {
        title: "Высота",
        dataIndex: ["product_size", "height"],
        key: "height",
        render: (height: number) => (height ? height : "-"),
    },
    {
        title: "Вес",
        dataIndex: ["product_size", "weight"],
        key: "weight",
        render: (weight: number) => (weight ? weight : "-"),
    },
    {
        title: "Комментарий",
        dataIndex: ["product_size", "comment"],
        key: "comment",
        render: (comment: string) => (comment ? comment : "-"),
    },
    {
        title: "",
        key: "action",
        render: (_, record) => (
            <UpdateSizesModal
                productId={record.id}
                product={record.product_size}
                vendorCode={record.vendor_code}
                productName={record.title}
            />
        ),
    },
];

const UpdateSizesModal = ({
    productId,
    vendorCode,
    productName,
    product,
}: {
    productId: number;
    vendorCode: string;
    product: ProductSizes | null;
    productName: string;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { formik } = useUpdateProductSize(
        product?.id || productId,
        product || null
    );

    return (
        <>
            <Modal
                open={isModalOpen}
                confirmLoading={formik.isSubmitting}
                okButtonProps={{
                    style: { width: "100%", height: 36, margin: 0 },
                }}
                cancelButtonProps={{
                    style: { width: "100%", height: 36, marginBottom: 10 },
                }}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Назад"
                onOk={() => {
                    formik.submitForm();
                    setIsModalOpen(false);
                }}
                destroyOnClose
            >
                <div className="flex flex-col gap-9">
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex gap-[66px]">
                            Артикул:{" "}
                            <span className="font-bold">{vendorCode}</span>
                        </div>
                        <div className="flex gap-5">
                            Наименование:
                            <span className="font-bold">{productName}</span>
                        </div>
                    </div>
                    <UpdateSizesForm formik={formik} />
                </div>
            </Modal>
            <Button
                onClick={() => setIsModalOpen(true)}
                icon={<EditOutlined style={{ fontSize: "15px" }} />}
                className="!rounded-[16px]"
            >
                Редактировать
            </Button>
        </>
    );
};

export const EmployeeSearchResultsTable: FC<{
    searchValue: string;
    filterKey: string;
}> = ({ searchValue, filterKey }) => {
    const [page, setPage] = useState(0);
    const hasSizes =
        filterKey === "scanned"
            ? true
            : filterKey === "non-scanned"
            ? false
            : null;
    const { data, isPending } = useGetProductsWithSizes(
        page,
        10,
        searchValue,
        hasSizes
    );

    // const mockData = [
    //     {
    //         productName: "Product 1",
    //         productArticle: "123456",
    //         vendorCode: "VENDOR_1",
    //         width: 10,
    //         length: 20,
    //         weight: 5,
    //         height: 15,
    //         comment: "Comment 1",
    //         state: "scanned",
    //     },
    //     {
    //         productName: "Product 2",
    //         productArticle: "789012",
    //         vendorCode: "VENDOR_2",
    //         width: null,
    //         length: null,
    //         weight: null,
    //         height: null,
    //         comment: null,
    //         state: "non-scanned",
    //     },
    // ];

    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <CustomTable
            columns={columns}
            loading={isPending}
            dataSource={data?.content}
            rowKey={(record) => record.vendor_code}
            pagination={{
                pageSize: 10,
                total: data?.totalElements,
                showSizeChanger: false,
                onChange(page) {
                    setPage(page - 1);
                },
                current: page + 1,
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
        />
    );
};
