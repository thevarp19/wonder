import { scan } from "@/assets";
import { Title } from "@/components/shared/Title";
import { Image } from "@/components/ui/Image";
import { SearchInput } from "@/components/ui/SearchInput";
import { useGetProductsByParams } from "@/modules/product/queries";
import { useScannerResults } from "@/modules/scan/hooks";
import { toScanProductsSearch } from "@/modules/scan/utils";
import { cn } from "@/utils/shared.util";
import { ConfigProvider, Table, TableColumnsType } from "antd";
import { FC, useEffect, useState } from "react";

interface EmployeeSearchPageProps {}

export const EmployeeSearchPage: FC<EmployeeSearchPageProps> = ({}) => {
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
        <div className="flex flex-col gap-5">
            <Title text="Поиск" />

            <div className="flex items-center gap-4 bg-[#F7F9FB] px-2 rounded-lg">
                <div className="flex items-center justify-between w-full max-w-md">
                    <SearchInput
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onSearch={handleSearch}
                    />
                </div>
                <div
                    onClick={toScanProductsSearch}
                    className="flex items-center justify-center bg-[#EF7214]  rounded-md cursor-pointer py-[14px] w-[130px] max-h-[32px] gap-2"
                >
                    <Image src={scan} alt="scan" className={cn("w-4 h-4")} />
                    <h2 className="text-xs text-white">CКАНИРОВАТЬ</h2>
                </div>
            </div>
            <EmployeeSearchResultsTable searchValue={searchQuery} />
        </div>
    );
};

const columns: TableColumnsType<any> = [
    {
        title: "Vendor Code",
        dataIndex: "vendorCode",
        key: "vendorCode",
    },
    {
        title: "Артикул",
        dataIndex: "article",
        key: "article",
    },
    {
        title: "Наименование",
        dataIndex: "productName",
        key: "productName",
    },
    {
        title: "Название склада",
        dataIndex: "shopName",
        key: "shopName",
    },
    {
        title: "Код ячейки",
        dataIndex: "cellCode",
        key: "cellCode",
    },
    {
        title: "Цена",
        dataIndex: "price",
        key: "price",
    },
];

export const EmployeeSearchResultsTable: FC<{ searchValue: string }> = ({
    searchValue,
}) => {
    const [page, setPage] = useState(0);
    const { data, isPending } = useGetProductsByParams(
        page,
        undefined,
        searchValue,
        true,
        true
    );
    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "#fff",
                        headerColor: "#1C1C1C66",
                        headerBorderRadius: 10,
                        headerSplitColor: "#fff",
                    },
                },
            }}
        >
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
        </ConfigProvider>
    );
};
