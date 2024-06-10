import { SearchInput } from "@/components/ui/SearchInput";
import { useGetProductsByParams } from "@/modules/product/queries";
import { useScannerResults } from "@/modules/scan/hooks";
import { toScanProductsSearch } from "@/modules/scan/utils";
import { Button, Table, TableColumnsType } from "antd";
import { FC, useCallback, useEffect, useState } from "react";

interface EmployeeSearchPageProps {}

export const EmployeeSearchPage: FC<EmployeeSearchPageProps> = ({}) => {
    const scanSearchValue = useScannerResults();

    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = useCallback(() => {
        setSearchQuery(searchValue);
    }, [searchValue]);
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
                        onClick={toScanProductsSearch}
                        className="uppercase"
                    >
                        CКАНИРОВАТЬ
                    </Button>
                </div>
            </div>
            <EmployeeSearchResultsTable searchValue={searchQuery} />
        </div>
    );
};

const columns: TableColumnsType<any> = [
    {
        title: "ID товара",
        dataIndex: "productId",
        key: "productId",
    },
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
        title: "Называние магазина",
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
