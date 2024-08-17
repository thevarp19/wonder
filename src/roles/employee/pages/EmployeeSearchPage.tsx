import { scan } from "@/assets";
import { Title } from "@/components/shared/Title";
import { CustomTable } from "@/components/ui/CustomTable";
import { Image } from "@/components/ui/Image";
import { SearchInput } from "@/components/ui/SearchInput";
import { useGetProductsByParams } from "@/modules/product/queries";
import { useScannerResults } from "@/modules/scan/hooks";
import { toScanProductsSearch } from "@/modules/scan/utils";
import { cn } from "@/utils/shared.util";
import { TableColumnsType } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

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
        <div className="flex flex-col">
            <Title text="Поиск" />

            <div className="flex md:flex-row flex-col items-center md:gap-4 gap-2 md:bg-[#F7F9FB] bg-[#fff] px-2 rounded-lg mb-5">
                <div className="flex items-center justify-between w-full md:max-w-md max-w">
                    <SearchInput
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onSearch={handleSearch}
                    />
                </div>
                <div
                    onClick={toScanProductsSearch}
                    className="flex items-center justify-center bg-[#EF7214]  rounded-md cursor-pointer py-[14px] md:w-[130px] w-full md:max-h-[32px] max-h-[47px] gap-2 px-2"
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
            <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                <EmployeeSearchResultsTable searchValue={searchQuery} />
            </div>
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

    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <CustomTable
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
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
        />
    );
};
