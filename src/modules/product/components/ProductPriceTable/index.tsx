import { myLocalStorage } from "@/lib/storage/browserStorage";
import {
    Button,
    Checkbox,
    ConfigProvider,
    InputNumber,
    Modal,
    Select,
    Table,
    TableColumnsType,
} from "antd";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
    ProductCityPriceChangeState,
    ProductPriceChangeState,
    getPriceChangeRequest,
    getPriceChanges,
    useProductPricesChange,
} from "../../forms";
import { changeProductPriceMutation } from "../../mutations";
import { useGetProductsPrices } from "../../queries";
import { ProductPriceCity, ProductWithPrices } from "../../types";
import { ProductPublishedFilter } from "../ProductsFilter/ProductPublishedFilter";
import { ProductEnableSwitch } from "../ProductsTable";

interface ProductPriceTableProps {
    debouncedSearchValue: string;
}

const columns: TableColumnsType<ProductWithPrices> = [
    {
        title: "Артикул",
        dataIndex: "vendorCode",
        // fixed: "left",
        // width: 150,
    },
    {
        title: "Название",
        render: (_, record) => (
            <a href={record.vendorCode} className="">
                {record.name}
            </a>
        ),
        width: 200,
        // fixed: "left",
        // width: 150,
    },
    {
        title: "Опубликовано",
        dataIndex: "isPublished",
        render: (_, record) => (
            <ProductEnableSwitch enabled={record.published} id={record.id} />
        ),
        // width: 100,
    },
    {
        title: "Кол-во",
        render: (_, record) => <div className="">{record.count}</div>,
        width: 100,
        sorter: (a, b) => a.count - b.count,
    },
];

function MainPriceCitySelect({
    isEditable,
    setValue,
    cities,
    mainCityId,
}: {
    isEditable: boolean;
    mainCityId: number | null;
    cities: ProductPriceCity[] | undefined;
    setValue: (value: string, label: string) => void;
}) {
    const selectedCity = cities?.find((city) => city.id === mainCityId) || null;

    return (
        <Select
            disabled={!isEditable}
            style={{ width: "100%", borderRadius: 24 }}
            defaultValue={selectedCity ? selectedCity.id.toString() : "-1"}
            onChange={(_, option) =>
                // @ts-ignore
                setValue(option.value, option.label)
            }
            options={[
                { value: "-1", label: "Не выбрано" },
                ...(cities ?? []).map((city) => ({
                    value: city.id.toString(),
                    label: city.name,
                })),
            ]}
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

export const ProductPriceTable: FC<ProductPriceTableProps> = ({
    debouncedSearchValue,
}) => {
    const [page, setPage] = useState(0);

    const [activeStores, setActiveStores] = useState<string[]>(
        myLocalStorage?.get("activeStores") || ["алматы"]
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPublished, setIsPublished] = useState<boolean | null>(null);
    const [isEditable, setIsEditable] = useState(false);

    const { data: products, isPending } = useGetProductsPrices(
        page,
        undefined,
        debouncedSearchValue,
        isPublished
    );
    useEffect(() => {
        setPage(0);
    }, [debouncedSearchValue]);
    useEffect(() => {
        myLocalStorage?.set("activeStores", activeStores);
    }, [activeStores]);

    const uniqueStores = [];
    for (const store of new Set(activeStores)) {
        if (products?.content.cities.length) {
            const storeIndex = products.content.cities.findIndex(
                (city) => city.name.toLowerCase() === store.toLowerCase()
            );
            if (storeIndex !== -1) {
                uniqueStores.push(store);
            }
        } else {
            uniqueStores.push(store);
        }
    }
    const { addCityPriceChange, addMainPriceChange, state, clearChanges } =
        useProductPricesChange();

    const newColumns = [
        ...columns,
        {
            title: "Главный город цены",
            render: (_: any, record: ProductWithPrices) => (
                <MainPriceCitySelect
                    isEditable={isEditable}
                    mainCityId={record?.mainPriceCityId}
                    setValue={(value, label) => {
                        addMainPriceChange({
                            productId: record.id,
                            productName: record.name,
                            mainCityId: Number(value),
                            mainCityName: label,
                        });
                    }}
                    cities={products?.content?.cities}
                />
            ),
            width: 150,
            // fixed: "left",
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

    const { mutateAsync } = changeProductPriceMutation();
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
            <Modal
                title="Склады"
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
                    stores={products?.content?.cities || []}
                />
            </Modal>
            <div className="flex items-center justify-between px-2 mb-4 md:px-4">
                <div className="flex items-center w-full gap-4">
                    {/* <div className="w-full max-w-sm">
                        <ProductsSearch
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        />
                    </div> */}
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
                    Склады
                </Button>
            </div>
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
                    // @ts-ignore
                    showSorterTooltip={{ target: "sorter-icon" }}
                    columns={newColumns}
                    locale={{
                        triggerDesc: "Нажмите для сортировки по убыванию",
                        triggerAsc: "Нажмите для сортировки по возрастанию",
                        cancelSort: "Нажмите для отмены сортировки",
                    }}
                    dataSource={products?.content?.products || []}
                    rowKey={(r) => r.vendorCode}
                    loading={isPending}
                    // scroll={{ x: 1200 }}
                    footer={() => (
                        <div className="flex justify-end">
                            {isEditable ? (
                                <SavePriceEditButton
                                    state={state}
                                    setIsEditable={setIsEditable}
                                    onClick={async () => {
                                        await mutateAsync(
                                            getPriceChangeRequest(state)
                                        );
                                        setIsEditable(false);
                                    }}
                                    clearChanges={clearChanges}
                                />
                            ) : (
                                <Button
                                    size="large"
                                    className="md:min-w-[200px] md:w-auto w-full mt-4 md:mt-0 !text-[#EF7214] !border-[#EF7214] cursor-pointer"
                                    onClick={() => setIsEditable(true)}
                                >
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
                        position: isSmallScreen ? ["bottomCenter"] : undefined,
                    }}
                    scroll={{ x: "max-content" }}
                />
            </ConfigProvider>
        </div>
    );
};
function SavePriceEditButton({
    onClick,
    state,
    clearChanges,
    setIsEditable,
}: {
    onClick: () => Promise<void>;
    state: ProductPriceChangeState;
    clearChanges: () => void;
    setIsEditable: Dispatch<SetStateAction<boolean>>;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Modal
                open={isModalOpen}
                width={800}
                title="Хотите сохранить изменения?"
                okButtonProps={{ size: "large" }}
                okText="Подтвердить"
                cancelButtonProps={{ size: "large" }}
                cancelText="Назад"
                onOk={async () => {
                    await onClick();
                    setIsModalOpen(false);
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
            >
                {isModalOpen && <PriceChanges {...state} />}
            </Modal>
            <div className="flex justify-end w-full gap-3">
                <Button
                    key="clear"
                    size="large"
                    className="md:min-w-[200px] md:w-auto w-full mt-4 md:mt-0"
                    onClick={() => {
                        clearChanges();
                        setIsModalOpen(false);
                        setIsEditable(false);
                    }}
                >
                    Очистить
                </Button>
                <Button
                    size="large"
                    className="md:min-w-[200px] md:w-auto w-full mt-4 md:mt-0"
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    Сохранить
                </Button>
            </div>
        </>
    );
}

function PriceChanges(state: ProductPriceChangeState) {
    return (
        <div>
            {getPriceChanges(state).map((change, index) => (
                <p key={index} className="text-[12px] md:text-base">
                    {change}
                </p>
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
            {/* <div
                style={{
                    backgroundColor: getColorFromCount(count),
                }}
            ></div> */}
            {isEditable ? (
                <InputNumber
                    defaultValue={price}
                    inputMode="numeric"
                    style={{
                        backgroundColor: getColorFromCount(count),
                        fontWeight: 600,
                        paddingLeft: 10,
                        borderRadius: 16,
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
                                newPrice: Number(value),
                            });
                        }
                    }}
                />
            ) : (
                <div
                    style={{
                        backgroundColor: getColorFromCount(count),
                    }}
                    className="flex items-center justify-center gap-2 py-1 font-semibold border rounded-2xl"
                >
                    {price} ₸
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
