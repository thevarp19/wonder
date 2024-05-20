import { myLocalStorage } from "@/lib/storage/browserStorage";
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
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
    ProductCityPriceChangeState,
    ProductPriceChangeState,
    getPriceChanges,
    useProductPricesChange,
} from "../../forms";
import { changeProductPriceMutation } from "../../mutations";
import { useGetProductsPrices } from "../../queries";
import { ProductPriceCity, ProductWithPrices } from "../../types";
import { ProductsSearch } from "../ProductSearch";
import { ProductPublishedFilter } from "../ProductsFilter/ProductPublishedFilter";
import { ProductEnableSwitch } from "../ProductsTable";

interface ProductPriceTableProps {}

const columns: TableColumnsType<ProductWithPrices> = [
    {
        title: "Article",
        dataIndex: "vendorCode",
        fixed: "left",
        width: 150,
    },
    {
        title: "Name",
        render: (_, record) => (
            <a href={record.vendorCode} className="">
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
            <ProductEnableSwitch enabled={record.published} id={record.id} />
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

function MainPriceCitySelect({
    isEditable,
    setValue,
    cities,
}: {
    isEditable: boolean;
    cities: ProductPriceCity[] | undefined;
    setValue: (value: string, label: string) => void;
}) {
    return (
        <Select
            disabled={!isEditable}
            style={{ width: 150 }}
            onChange={(_, option) =>
                // @ts-ignore
                setValue(option.value, option.label)
            }
            options={cities?.map((city) => ({
                value: `${city.id}`,
                label: city.name,
            }))}
        ></Select>
    );
}

function StoreCheckboxes({
    checked,
    setChecked,
    stores,
}: {
    checked: string[];
    setChecked: Dispatch<SetStateAction<string[]>>;
    stores: ProductPriceCity[];
}) {
    return (
        <div className="flex flex-col gap-4">
            {stores.map((store) => (
                <div key={store.name.toLowerCase()}>
                    <Checkbox
                        checked={
                            checked.findIndex((name) => {
                                console.log(name, store.name.toLowerCase());
                                return name === store.name.toLowerCase();
                            }) !== -1
                        }
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
    record: ProductWithPrices
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

    const [activeStores, setActiveStores] = useState<string[]>(
        myLocalStorage?.get("activeStores") || ["алматы"]
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPublished, setIsPublished] = useState<boolean | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const [isEditable, setIsEditable] = useState(false);
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const { data: products } = useGetProductsPrices(
        page,
        undefined,
        debouncedSearchValue,
        isPublished
    );
    useEffect(() => {
        myLocalStorage?.set("activeStores", activeStores);
    }, [activeStores]);
    const uniqueStores = [];
    for (const store of new Set(activeStores)) {
        if (products?.content[0].cities.length) {
            const storeIndex = products.content[0].cities.findIndex(
                (city) => city.name.toLowerCase() === store.toLowerCase()
            );
            if (storeIndex !== -1) {
                uniqueStores.push(store);
            }
        } else {
            uniqueStores.push(store);
        }
    }
    const { addCityPriceChange, addMainPriceChange, state } =
        useProductPricesChange();
    const newColumns = [
        ...columns,
        {
            title: "Main price city",
            render: (_: any, record: ProductWithPrices) => (
                <MainPriceCitySelect
                    isEditable={isEditable}
                    setValue={(value, label) => {
                        addMainPriceChange({
                            productId: record.id,
                            productName: record.name,
                            mainCityId: Number(value),
                            mainCityName: label,
                        });
                    }}
                    cities={products?.content?.[0].cities}
                />
            ),
            width: 150,
            fixed: "left",
        },
        ...uniqueStores
            .sort((a, b) => a.localeCompare(b))
            .map((store) => ({
                title: `${store.toLocaleUpperCase()}`,
                width: 120,
                render: (_: any, record: ProductWithPrices) => (
                    <ProductPriceCell
                        store={store}
                        record={record}
                        state={state}
                        isEditable={isEditable}
                        addCityPriceChange={addCityPriceChange}
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
                    checked={activeStores}
                    setChecked={setActiveStores}
                    stores={products?.content?.[0]?.cities || []}
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
                dataSource={products?.content?.[0]?.products || []}
                rowKey={(r) => r.vendorCode}
                scroll={{ x: 1200 }}
                footer={() => (
                    <div className="flex justify-end">
                        {isEditable ? (
                            <SavePriceEditButton
                                state={state}
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
function SavePriceEditButton({
    onClick,
    state,
}: {
    onClick: () => void;
    state: ProductPriceChangeState;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Modal
                open={isModalOpen}
                width={800}
                title="Do you want to save changes?"
                onOk={() => {
                    onClick();
                    setIsModalOpen(false);
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
            >
                {isModalOpen && <PriceChanges {...state} />}
            </Modal>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Сохранить
            </Button>
            ;
        </>
    );
}

function PriceChanges(state: ProductPriceChangeState) {
    return (
        <div>
            {getPriceChanges(state).map((change, index) => (
                <div key={index}>{change}</div>
            ))}
        </div>
    );
}

function ProductPriceCell({
    store,
    record,
    isEditable,
    addCityPriceChange,
    state,
}: {
    store: string;
    record: ProductWithPrices;
    isEditable: boolean;
    addCityPriceChange: (cityPrice: ProductCityPriceChangeState) => void;
    state: ProductPriceChangeState;
}) {
    const { price, count, storeId } = findProductPriceAndCountInCity(
        store,
        record
    );
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
                    value={
                        state.cityPrices.find(
                            (cityPrice) =>
                                cityPrice.productId === record.id &&
                                cityPrice.cityId === storeId
                        )?.newPrice || price
                    }
                    onChange={(value) => {
                        if (value !== null) {
                            addCityPriceChange({
                                productId: record.id,
                                productName: record.name,
                                cityId: storeId,
                                cityName: store,
                                prevPrice: price,
                                newPrice: value,
                            });
                        }
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
