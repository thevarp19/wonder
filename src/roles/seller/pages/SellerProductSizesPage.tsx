import { CustomTable } from "@/components/ui/CustomTable";
import { FilterButton } from "@/components/ui/FilterButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { Menu, MenuProps, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface SellerProductSizesPageProps {}
const items: MenuProps["items"] = [
    {
        label: "Все",
        key: "all",
    },
];
export const SellerProductSizesPage: FC<SellerProductSizesPageProps> = ({}) => {
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
                    <div>
                        <FilterButton />
                    </div>
                </div>
            </div>
            <Menu
                items={items}
                mode="horizontal"
                onClick={onClick}
                selectedKeys={[current]}
            />
            <SellerSearchResultsTable searchValue={""} />
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
];

export const SellerSearchResultsTable: FC<{ searchValue: string }> = ({}) => {
    return (
        <CustomTable
            dataSource={[
                {
                    id: 1,
                    name: "Название продукта",
                    length: 1,
                    width: 2,
                    height: 3,
                    weight: 4,
                    comment: "Комментарий",
                },
            ]}
            columns={columns}
        />
    );
};
