import { Checkbox, Switch, Table, TableColumnsType } from "antd";
import { FC, useEffect, useState } from "react";
import { changeProductsVisibilityMutation } from "../../mutations";
import { useGetProducts } from "../../queries";
import { GetProductContent } from "../../types";

interface ProductsTableProps {
    searchValue?: string;
}

const columns: TableColumnsType<GetProductContent> = [
    {
        title: "Article",
        dataIndex: "vendorCode",
    },
    {
        title: "Name",
        render: (_, record) => <a href={record.vendorCode}>{record.name}</a>,
    },
    {
        title: "Published",
        dataIndex: "isPublished",
        render: (_, record) => <ProductEnableSwitch record={record} />,
    },
    {
        title: "Price in Almaty",
        render: (_, record) => <span>{record.prices[0].price}</span>,
    },
    {
        title: "Price in Astana",
        render: (_, record) => <span>{record.prices[1].price}</span>,
    },
    {
        title: "Price in Shymkent",
        render: (_, record) => <span>{record.prices[2]?.price}</span>,
    },
];

export const ProductsTable: FC<ProductsTableProps> = ({ searchValue }) => {
    const [page, setPage] = useState(0);
    const [isPublished, setIsPublished] = useState<boolean | null>(null);
    const [checked, setChecked] = useState<("published" | "unpublished")[]>([]);
    useEffect(() => {
        if (checked.includes("published") && checked.includes("unpublished")) {
            setIsPublished(null);
        } else if (checked.includes("published")) {
            setIsPublished(true);
        } else if (checked.includes("unpublished")) {
            setIsPublished(false);
        } else {
            setIsPublished(null);
        }
    }, [checked]);
    const { data: products, isPending } = useGetProducts(
        page,
        undefined,
        searchValue,
        isPublished
    );

    return (
        <div>
            <div className="flex my-4">
                <Checkbox
                    onChange={(e) => {
                        if (e.target.checked) {
                            setChecked((prev) => [...prev, "published"]);
                        } else {
                            setChecked((prev) =>
                                prev.filter((item) => item !== "published")
                            );
                        }
                    }}
                >
                    Published
                </Checkbox>
                <Checkbox
                    onChange={(e) => {
                        if (e.target.checked) {
                            setChecked((prev) => [...prev, "unpublished"]);
                        } else {
                            setChecked((prev) =>
                                prev.filter((item) => item !== "unpublished")
                            );
                        }
                    }}
                >
                    Unpublished
                </Checkbox>
            </div>
            <Table
                columns={columns}
                loading={isPending}
                dataSource={products?.content}
                rowKey={"article"}
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

function ProductEnableSwitch({ record }: { record: GetProductContent }) {
    const { isPending, mutateAsync } = changeProductsVisibilityMutation();
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={record.enabled}
                loading={isPending}
                onChange={async (checked) => {
                    mutateAsync({ id: record.id, isPublished: checked });
                }}
            />
        </div>
    );
}
