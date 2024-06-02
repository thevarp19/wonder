import { FilterButton } from "@/components/ui/FilterButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button, Table, TableColumnsType } from "antd";
import { FC } from "react";

interface EmployeeSearchPageProps {}

export const EmployeeSearchPage: FC<EmployeeSearchPageProps> = ({}) => {
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
                    <div>
                        <FilterButton />
                    </div>
                </div>
                <div>
                    <Button size="large" type="primary" className="uppercase">
                        CКАНИРОВАТЬ
                    </Button>
                </div>
            </div>
            <EmployeeSearchResultsTable searchValue={""} />
        </div>
    );
};

const columns: TableColumnsType<any> = [
    {
        title: "ID товара",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Артикул",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Наименование",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Называние магазина",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Расположение",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Цена",
        dataIndex: "role",
        key: "role",
    },
];

export const EmployeeSearchResultsTable: FC<{ searchValue: string }> = ({
    searchValue,
}) => {
    return <Table dataSource={[]} columns={columns} />;
};
