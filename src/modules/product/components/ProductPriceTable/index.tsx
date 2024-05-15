import { useDebounce } from "@/utils/shared.util";
import { EditOutlined } from "@ant-design/icons";
import {
    Button,
    Checkbox,
    Form,
    InputNumber,
    Modal,
    Select,
    Table,
    TableColumnsType,
} from "antd";
import clsx from "clsx";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { changeProductPriceMutation } from "../../mutations";
import { useGetProductsPrices } from "../../queries";
import { ProductPrice2, ProductPriceCity } from "../../types";
import { ProductsSearch } from "../ProductSearch";
import { ProductPublishedFilter } from "../ProductsFilter/ProductPublishedFilter";
import { ProductEnableSwitch } from "../ProductsTable";

interface ProductPriceTableProps {}

const productsMock: ProductPrice2[] = [
    {
        id: 1,
        vendorCode: "V1001",
        name: "Product A",
        count: 150,
        prices: [
            { cityId: 101, cityName: "Алматы", price: 99.99 },
            { cityId: 102, cityName: "Астана", price: 89.99 },
        ],
    },
    {
        id: 2,
        vendorCode: "V1002",
        name: "Product B",
        count: 200,
        prices: [
            { cityId: 101, cityName: "Алматы", price: 199.99 },
            { cityId: 103, cityName: "Шымкент", price: 209.99 },
        ],
    },
    {
        id: 3,
        vendorCode: "V1003",
        name: "Product C",
        count: 50,
        prices: [{ cityId: 104, cityName: "Алматы", price: 129.99 }],
    },
    {
        id: 4,
        vendorCode: "V1004",
        name: "Product D",
        count: 100,
        prices: [{ cityId: 102, cityName: "Астана", price: 189.99 }],
    },
    {
        id: 5,
        vendorCode: "V1005",
        name: "Product E",
        count: 75,
        prices: [
            { cityId: 105, cityName: "Астана", price: 159.99 },
            { cityId: 101, cityName: "Алматы", price: 149.99 },
        ],
    },
    // {
    //     id: 6,
    //     vendorCode: "V1006",
    //     name: "Product F",
    //     count: 60,
    //     prices: [{ cityId: 106, cityName: "Шымкент", price: 119.99 }],
    // },
    // {
    //     id: 7,
    //     vendorCode: "V1007",
    //     name: "Product G",
    //     count: 85,
    //     prices: [
    //         { cityId: 107, cityName: "Шымкент", price: 99.99 },
    //         { cityId: 102, cityName: "Астана", price: 109.99 },
    //     ],
    // },
    // {
    //     id: 8,
    //     vendorCode: "V1008",
    //     name: "Product H",
    //     count: 90,
    //     prices: [{ cityId: 108, cityName: "Алматы", price: 139.99 }],
    // },
    // {
    //     id: 9,
    //     vendorCode: "V1009",
    //     name: "Product I",
    //     count: 120,
    //     prices: [
    //         { cityId: 101, cityName: "Алматы", price: 169.99 },
    //         { cityId: 109, cityName: "Астана", price: 179.99 },
    //     ],
    // },
    // {
    //     id: 10,
    //     vendorCode: "V1010",
    //     name: "Product J",
    //     count: 200,
    //     prices: [
    //         { cityId: 110, cityName: "Алматы", price: 189.99 },
    //         { cityId: 103, cityName: "Шымкент", price: 199.99 },
    //     ],
    // },
];

const columns: TableColumnsType<ProductPrice2> = [
    {
        title: "Article",
        dataIndex: "vendorCode",
        fixed: "left",
        width: 150,
    },
    {
        title: "Name",
        render: (_, record) => (
            <a href={record.vendorCode} className="text-nowrap">
                {record.name}
            </a>
        ),
        fixed: "left",
        width: 150,
    },
    {
        title: "Published",
        dataIndex: "isPublished",
        render: (_, record) => (
            <ProductEnableSwitch
                enabled={record.count % 2 != 1}
                id={record.id}
            />
        ),
        width: 100,
    },
    {
        title: "Count",
        render: (_, record) => <div className="">{record.count}</div>,
        width: 70,
        fixed: "left",
    },
];

function MainPriceCitySelect({ isEditable }: { isEditable: boolean }) {
    const [value, setValue] = useState("none");
    return (
        <Select
            disabled={!isEditable}
            style={{ width: 150 }}
            value={value}
            onChange={(value) => setValue(value)}
            options={[
                {
                    label: "Не выбрано",
                    value: "none",
                },
                {
                    label: "Алматы",
                    value: "almaty",
                },
                {
                    label: "Астана",
                    value: "astana",
                },
                {
                    label: "Шымкент",
                    value: "shymkent",
                },
            ]}
        ></Select>
    );
}

function StoreCheckboxes({
    setChecked,
    stores,
}: {
    setChecked: Dispatch<SetStateAction<string[]>>;
    stores: ProductPriceCity[];
}) {
    return (
        <div className="flex flex-col gap-4">
            {stores.map((store) => (
                <div key={store.name.toLowerCase()}>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setChecked((prev) => [
                                    ...prev,
                                    store.name.toLowerCase(),
                                ]);
                            } else {
                                setChecked((prev) =>
                                    prev.filter(
                                        (name) =>
                                            name.toLowerCase() !==
                                            store.name.toLowerCase()
                                    )
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

function findProductPriceAndCountInCity(
    storeName: string,
    record: ProductPrice2
) {
    let result = {
        price: 0,
        count: 0,
        storeId: 0,
    };
    record.prices.forEach((price) => {
        if (price.cityName.toLowerCase() === storeName.toLowerCase()) {
            result.price = price.price;
            result.count = record.count;
            result.storeId = price.cityId;
        }
    });
    return result;
}

interface UpdatePriceModalProps {
    productCode: string;
    prices: {
        cityId: number;
        cityName: string;
        price: number;
    }[];
}

export const UpdatePriceModal: FC<UpdatePriceModalProps> = ({
    productCode,
    prices,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { isPending } = changeProductPriceMutation(productCode);
    return (
        <>
            <Modal
                title="Update Cell"
                open={isModalOpen}
                onOk={() => {
                    form.submit();
                }}
                okButtonProps={{ loading: isPending }}
                onCancel={() => setIsModalOpen(false)}
                destroyOnClose
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={async () => {
                        // await mutateAsync({ cityId, price: values.price });
                        setIsModalOpen(false);
                    }}
                >
                    {prices.map((price) => (
                        <Form.Item
                            label={`Price in ${price.cityName}`}
                            name="price"
                            required
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the price!",
                                    min: 0,
                                    type: "number",
                                },
                            ]}
                        >
                            <InputNumber
                                name="price"
                                type="number"
                                defaultValue={price.price}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
            <Button
                className="cursor-pointer"
                onClick={() => setIsModalOpen(true)}
                icon={<EditOutlined />}
            ></Button>
        </>
    );
};

export const ProductPriceTable: FC<ProductPriceTableProps> = ({}) => {
    const [page, setPage] = useState(0);

    const [activeStores, setActiveStores] = useState<string[]>(["алматы"]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPublished, setIsPublished] = useState<boolean | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const [isEditable, setIsEditable] = useState(false);
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const { data: products } = useGetProductsPrices(
        page,
        undefined,
        debouncedSearchValue
    );
    const uniqueStores = [];
    for (const store of new Set(activeStores)) {
        uniqueStores.push(store);
    }
    const newColumns = [
        ...columns,
        {
            title: "Main price city",
            render: (_: any) => <MainPriceCitySelect isEditable={isEditable} />,
            width: 150,
            fixed: "left",
        },
        ...uniqueStores.map((store) => ({
            title: `${store.toLocaleUpperCase()}`,
            width: 120,
            render: (_: any, record: ProductPrice2) => (
                <ProductPriceCell
                    store={store}
                    record={record}
                    isEditable={isEditable}
                />
            ),
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
                <StoreCheckboxes
                    setChecked={setActiveStores}
                    stores={["Алматы", "Астана", "Шымкент"].map(
                        (store, index) => ({
                            name: store,
                            id: index,
                            code: `store-${index}`,
                            enabled: true,
                        })
                    )}
                />
            </Modal>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center w-full gap-4">
                    <div className="w-full max-w-sm">
                        <ProductsSearch
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        />
                    </div>
                    <ProductPublishedFilter
                        isPublished={isPublished}
                        setIsPublished={setIsPublished}
                    />
                </div>
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
                // @ts-ignore
                columns={newColumns}
                dataSource={productsMock}
                rowKey={(r) => r.vendorCode}
                scroll={{ x: 1200 }}
                footer={() => (
                    <div className="flex justify-end">
                        {isEditable ? (
                            <SavePriceEditButton
                                onClick={() => setIsEditable(false)}
                            />
                        ) : (
                            <Button onClick={() => setIsEditable(true)}>
                                Редактировать
                            </Button>
                        )}
                    </div>
                )}
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
function SavePriceEditButton({ onClick }: { onClick: () => void }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Modal
                open={isModalOpen}
                title="Do you want to save changes?"
                onOk={() => {
                    onClick();
                    setIsModalOpen(false);
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
            >
                <div>
                    Product A: Алматы 100{" -> "}400; Астана 200{" -> "}300;
                </div>
                <div>
                    Product B: Алматы 100{" -> "}400; Астана 200{" -> "}300;
                </div>
                <div>
                    Product C: Алматы 100{" -> "}400; Астана 200{" -> "}300;
                </div>
            </Modal>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Сохранить
            </Button>
            ;
        </>
    );
}
function ProductPriceCell({
    store,
    record,
    isEditable,
}: {
    store: string;
    record: ProductPrice2;
    isEditable: boolean;
}) {
    const { price, count } = findProductPriceAndCountInCity(store, record);
    return (
        <div className="relative w-full h-full ">
            <div
                style={{
                    backgroundColor: getColorFromCount(count),
                }}
                className={clsx(
                    "absolute -top-[16px] -left-[16px] h-[55px] w-full"
                )}
            ></div>
            {isEditable ? (
                <InputNumber
                    defaultValue={price}
                    style={{
                        backgroundColor: getColorFromCount(count),
                        fontWeight: 600,
                        position: "relative",
                        top: -4,
                        left: -7,
                    }}
                />
            ) : (
                <div className="relative flex items-center gap-2 font-semibold">
                    {price} KZT
                </div>
            )}
        </div>
    );
}

function getColorFromCount(count: number) {
    count = Math.min(Math.max(count, 0), 200);

    const factor = count / 200;

    const red = Math.round(255 - 127 * factor);

    const green = Math.round(255 - 255 * factor);

    const blue = Math.round(0 + 128 * factor);

    return `rgb(${red},${green},${blue})`;
}
